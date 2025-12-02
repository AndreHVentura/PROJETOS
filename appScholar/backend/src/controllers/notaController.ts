import { Request, Response } from "express";
import { Nota } from "../models/nota";
import { Aluno } from "../models/aluno";
import { Disciplina } from "../models/disciplina";
import { Professor } from "../models/professor";
import { AlunoInstance } from "../types/sequelize";
import { NotaInstance } from "../types/sequelize";
import { DisciplinaInstance } from "../types/sequelize";
import { AuthRequest } from "../middleware/authMiddleware";

export const cadastrarNota = async (req: AuthRequest, res: Response) => {
  try {
    const professorId = req.usuario?.id;
    const perfil = req.usuario?.perfil;
    const { alunoMatricula, disciplinaId, nota1, nota2, nota3, nota4, nota5 } =
      req.body;

    // Validar campos obrigatórios
    if (!alunoMatricula || !disciplinaId) {
      return res.status(400).json({
        error: "Matrícula do aluno e ID da disciplina são obrigatórios",
      });
    }

    // Verificar se usuário é professor ou admin
    if (!professorId || (perfil !== 'professor' && perfil !== 'admin')) {
      return res.status(403).json({
        error: "Apenas professores e administradores podem lançar notas"
      });
    }

    // Buscar aluno pela matrícula
    const aluno = (await Aluno.findOne({
      where: { matricula: alunoMatricula },
    })) as AlunoInstance | null;
    if (!aluno) {
      return res.status(404).json({ error: "Aluno não encontrado" });
    }

    const whereClause: any = { id: disciplinaId };
    
    if (perfil === 'professor') {
      // Professor só pode lançar notas em suas próprias disciplinas
      whereClause.professorId = professorId;
    }
    
    const disciplina = await Disciplina.findOne({
      where: whereClause,
      include: [
        {
          model: Professor,
          attributes: ['id', 'nome', 'email']
        }
      ]
    });

    if (!disciplina) {
      if (perfil === 'professor') {
        return res.status(403).json({
          error: "Você não tem permissão para lançar notas nesta disciplina ou disciplina não encontrada"
        });
      }
      return res.status(404).json({ error: "Disciplina não encontrada" });
    }

    // Verificar se já existe nota para este aluno nesta disciplina
    const notaExistente = await Nota.findOne({
      where: { alunoId: aluno.id, disciplinaId },
    });

    if (notaExistente) {
      return res.status(400).json({
        error: "Já existe nota cadastrada para este aluno nesta disciplina",
        notaExistente: {
          id: notaExistente.id,
          media: notaExistente.media,
          situacao: notaExistente.situacao
        }
      });
    }

    // Validar e processar notas
    const notasArray = [nota1, nota2, nota3, nota4, nota5];
    const notasValidas = notasArray.filter(
      (nota) =>
        nota !== undefined &&
        nota !== null &&
        !isNaN(parseFloat(nota)) &&
        parseFloat(nota) >= 0 &&
        parseFloat(nota) <= 10
    );

    if (notasValidas.length === 0) {
      return res.status(400).json({
        error: "Pelo menos uma nota válida (0-10) deve ser fornecida",
      });
    }

    // Garantir que todas as notas sejam números
    const notasNumericas = notasArray.map(nota => {
      const valor = parseFloat(nota);
      return isNaN(valor) ? 0 : Math.max(0, Math.min(10, valor)); // Clamp entre 0 e 10
    });

    // Calcular média apenas das notas válidas (diferentes de 0 ou fornecidas)
    const soma = notasValidas.reduce((acc, nota) => acc + parseFloat(nota), 0);
    const media = parseFloat((soma / notasValidas.length).toFixed(2));

    // Determinar situação
    let situacao = "Reprovado";
    if (media >= 7.0) {
      situacao = "Aprovado";
    } else if (media >= 5.0) {
      situacao = "Recuperação";
    }

    const nota = (await Nota.create({
      alunoId: aluno.id,
      disciplinaId,
      nota1: notasNumericas[0],
      nota2: notasNumericas[1],
      nota3: notasNumericas[2],
      nota4: notasNumericas[3],
      nota5: notasNumericas[4],
      media,
      situacao,
    })) as NotaInstance;

    // Buscar a nota criada com informações relacionadas
    const notaCompleta = await Nota.findByPk(nota.id, {
      include: [
        { 
          model: Aluno, 
          attributes: ["id", "nome", "matricula", "curso"] 
        },
        { 
          model: Disciplina, 
          attributes: ["id", "nome", "cargaHoraria"],
          include: [{
            model: Professor,
            attributes: ['id', 'nome', 'email']
          }]
        },
      ],
    });

    // Registrar quem lançou a nota (opcional - para auditoria)
    console.log(`📝 Nota lançada por ${req.usuario?.nome} (${req.usuario?.perfil})`);

    res.status(201).json({
      message: "Nota cadastrada com sucesso",
      nota: notaCompleta,
      estatisticas: {
        media,
        situacao,
        totalNotasValidas: notasValidas.length,
        lancadoPor: {
          id: req.usuario?.id,
          nome: req.usuario?.nome,
          perfil: req.usuario?.perfil
        }
      },
    });
  } catch (error) {
    console.error("Erro ao cadastrar nota:", error);
    res.status(400).json({
      error: "Erro ao cadastrar nota",
      details: error instanceof Error ? error.message : error,
    });
  }
};

// Método para atualizar nota
export const atualizarNota = async (req: AuthRequest, res: Response) => {
  try {
    const professorId = req.usuario?.id;
    const perfil = req.usuario?.perfil;
    const { id } = req.params;
    const { nota1, nota2, nota3, nota4, nota5 } = req.body;

    const nota = (await Nota.findByPk(id, {
      include: [{
        model: Disciplina,
        as: 'disciplina',
        attributes: ['id', 'professorId']
      }]
    })) as (NotaInstance & { disciplina?: DisciplinaInstance }) | null;
    
    if (!nota) {
      return res.status(404).json({ error: "Nota não encontrada" });
    }

    // Verificar permissão
    if (perfil === 'professor' && nota.disciplina?.professorId !== professorId) {
      return res.status(403).json({
        error: "Você não tem permissão para editar esta nota"
      });
    }

    // Atualizar apenas as notas fornecidas
    const atualizacoes: any = {};
    
    if (nota1 !== undefined) {
      const valor = parseFloat(nota1);
      atualizacoes.nota1 = isNaN(valor) ? 0 : Math.max(0, Math.min(10, valor));
    }
    if (nota2 !== undefined) {
      const valor = parseFloat(nota2);
      atualizacoes.nota2 = isNaN(valor) ? 0 : Math.max(0, Math.min(10, valor));
    }
    if (nota3 !== undefined) {
      const valor = parseFloat(nota3);
      atualizacoes.nota3 = isNaN(valor) ? 0 : Math.max(0, Math.min(10, valor));
    }
    if (nota4 !== undefined) {
      const valor = parseFloat(nota4);
      atualizacoes.nota4 = isNaN(valor) ? 0 : Math.max(0, Math.min(10, valor));
    }
    if (nota5 !== undefined) {
      const valor = parseFloat(nota5);
      atualizacoes.nota5 = isNaN(valor) ? 0 : Math.max(0, Math.min(10, valor));
    }

    // Se alguma nota foi fornecida, recalcular média
    if (Object.keys(atualizacoes).length > 0) {
      // Usar todas as 5 notas para calcular a média
      const notasAtuais = [
        atualizacoes.nota1 !== undefined ? atualizacoes.nota1 : nota.nota1,
        atualizacoes.nota2 !== undefined ? atualizacoes.nota2 : nota.nota2,
        atualizacoes.nota3 !== undefined ? atualizacoes.nota3 : nota.nota3,
        atualizacoes.nota4 !== undefined ? atualizacoes.nota4 : nota.nota4,
        atualizacoes.nota5 !== undefined ? atualizacoes.nota5 : nota.nota5
      ];

      // Filtrar apenas notas válidas (diferentes de 0)
      const notasValidas = notasAtuais.filter(nota => nota > 0);
      const soma = notasValidas.length > 0 ? 
        notasValidas.reduce((acc, n) => acc + n, 0) : 0;
      const media = parseFloat((soma / (notasValidas.length || 1)).toFixed(2));
      
      let situacao = "Reprovado";
      if (media >= 7.0) {
        situacao = "Aprovado";
      } else if (media >= 5.0) {
        situacao = "Recuperação";
      }

      atualizacoes.media = media;
      atualizacoes.situacao = situacao;
    }

    await nota.update(atualizacoes);

    const notaAtualizada = await Nota.findByPk(id, {
      include: [
        { 
          model: Aluno,
          as: 'aluno',
          attributes: ["id", "nome", "matricula", "curso"] 
        },
        { 
          model: Disciplina, 
          as: 'disciplina',
          attributes: ["id", "nome", "cargaHoraria", "professorId"],
        },
      ],
    });

    res.json({
      message: "Nota atualizada com sucesso",
      nota: notaAtualizada,
      atualizadoPor: {
        id: req.usuario?.id,
        nome: req.usuario?.nome,
        perfil: req.usuario?.perfil
      }
    });
  } catch (error) {
    console.error("Erro ao atualizar nota:", error);
    res.status(400).json({
      error: "Erro ao atualizar nota",
      details: error instanceof Error ? error.message : error,
    });
  }
};

// Listar todas as notas
export const listarNotas = async (req: Request, res: Response) => {
  try {
    const notas = await Nota.findAll({
      include: [
        { model: Aluno, attributes: ["id", "nome", "matricula", "curso"] },
        { model: Disciplina, attributes: ["id", "nome", "cargaHoraria"] },
      ],
      order: [["createdAt", "DESC"]],
    });
    res.json(notas);
  } catch (error) {
    console.error("Erro ao listar notas:", error);
    res.status(500).json({
      error: "Erro ao listar notas",
      details: error instanceof Error ? error.message : error,
    });
  }
};

// Listar disciplinas do professor logado
export const listarDisciplinasDoProfessor = async (req: AuthRequest, res: Response) => {
  try {
    const professorId = req.usuario?.id; // ID do professor logado
    
    const disciplinas = await Disciplina.findAll({
      where: { professorId },
      attributes: ['id', 'nome', 'cargaHoraria'],
      order: [['nome', 'ASC']]
    });
    
    res.json(disciplinas);
  } catch (error) {
    console.error("Erro ao listar disciplinas do professor:", error);
    res.status(500).json({ 
      error: "Erro ao listar disciplinas",
      details: error instanceof Error ? error.message : error
    });
  }
};

//Listar alunos de uma disciplina específica
export const listarAlunosPorDisciplina = async (req: Request, res: Response) => {
  try {
    const { disciplinaId } = req.params;
    
    // Buscar todas as notas dessa disciplina para obter os alunos
    const notas = await Nota.findAll({
      where: { disciplinaId: disciplinaId },
      include: [
        { 
          model: Aluno, 
          as: 'aluno',
          attributes: ['id', 'nome', 'matricula', 'curso'],
          required: true 
        }
      ],
    });
    
    // Extrair alunos únicos manualmente
    const alunosUnicos: AlunoInstance[] = [];
    const alunosMap = new Map<number, AlunoInstance>();
    
    notas.forEach(nota => {
      if (nota.aluno && !alunosMap.has(nota.aluno.id)) {
        alunosMap.set(nota.aluno.id, nota.aluno);
        alunosUnicos.push(nota.aluno);
      }
    });

    if (alunosUnicos.length === 0) {
      return res.json([]);
    }

    res.json(alunosUnicos);
  } catch (error) {
    console.error("Erro ao listar alunos por disciplina:", error);
    res.status(500).json({ 
      error: "Erro ao listar alunos",
      details: error instanceof Error ? error.message : error
    });
  }
};

// 3. Buscar nota específica de um aluno em uma disciplina
export const buscarNotaAlunoDisciplina = async (req: Request, res: Response) => {
  try {
    const { alunoId, disciplinaId } = req.params;
    
    const nota = await Nota.findOne({
      where: { alunoId, disciplinaId },
      include: [
        { model: Aluno, attributes: ['id', 'nome', 'matricula'] },
        { model: Disciplina, attributes: ['id', 'nome'] }
      ]
    });
    
    if (nota) {
      res.json(nota);
    } else {
      res.status(404).json({ 
        message: "Nota não encontrada",
        alunoId,
        disciplinaId
      });
    }
  } catch (error) {
    console.error("Erro ao buscar nota:", error);
    res.status(500).json({ 
      error: "Erro ao buscar nota",
      details: error instanceof Error ? error.message : error
    });
  }
};