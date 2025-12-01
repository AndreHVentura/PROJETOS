-- 1. USUÁRIOS
INSERT INTO usuarios (nome, email, senha, perfil, "createdAt", "updatedAt") VALUES
('Andre Olimpio', 'andre.olimpio@scholar.com', 'prof123', 'professor', NOW(), NOW()),
('Neymar Siqueira', 'neymar.siqueira@scholar.com', 'prof123', 'professor', NOW(), NOW()),
('Lucineide Nunes', 'lucineide.nunes@scholar.com', 'prof123', 'professor', NOW(), NOW()),
('Leandro Hoffman', 'leandro.hoffman@scholar.com', 'prof123', 'professor', NOW(), NOW()),
('João Pedro Oliveira', 'joao.oliveira@scholar.com', 'aluno123', 'aluno', NOW(), NOW()),
('Maria Clara Souza', 'maria.souza@scholar.com', 'aluno123', 'aluno', NOW(), NOW()),
('Pedro Henrique Costa', 'pedro.costa@scholar.com', 'aluno123', 'aluno', NOW(), NOW()),
('Julia Fernandes', 'julia.fernandes@scholar.com', 'aluno123', 'aluno', NOW(), NOW()),
('Lucas Mendes', 'lucas.mendes@scholar.com', 'aluno123', 'aluno', NOW(), NOW());

-- 2. PROFESSORES (COM matricula)
INSERT INTO "Professors" (nome, matricula, titulacao, "tempoDocencia", email, "createdAt", "updatedAt") VALUES
('Andre Olimpio', 'PROF001', 'Doutor', 15, 'andre.olimpio@scholar.com', NOW(), NOW()),
('Neymar Siqueira', 'PROF002', 'Especialista', 12, 'neymar.siqueira@scholar.com', NOW(), NOW()),
('Lucineide Nunes', 'PROF003', 'Mestre', 10, 'lucineide.nunes@scholar.com', NOW(), NOW()),
('Leandro Hoffman', 'PROF004', 'Doutor', 20, 'leandro.hoffman@scholar.com', NOW(), NOW());

-- 3. ALUNOS
INSERT INTO "Alunos" (nome, matricula, curso, "createdAt", "updatedAt") VALUES
('João Pedro Oliveira', '20240001', 'Engenharia de Software', NOW(), NOW()),
('Maria Clara Souza', '20240002', 'Ciência da Computação', NOW(), NOW()),
('Pedro Henrique Costa', '20240003', 'Análise de Sistemas', NOW(), NOW()),
('Julia Fernandes', '20240004', 'Sistemas de Informação', NOW(), NOW()),
('Lucas Mendes', '20240005', 'Engenharia de Computação', NOW(), NOW());

-- 4. DISCIPLINAS
INSERT INTO "Disciplinas" (nome, "cargaHoraria", "professorId", "createdAt", "updatedAt") VALUES
('Engenharia de software II', 60, 1, NOW(), NOW()),
('Programação de Dispositivos Móveis I', 80, 1, NOW(), NOW()),
('Desenvolvimento Web II', 60, 2, NOW(), NOW()),
('Laboratório de Desenvolvimento Web', 80, 2, NOW(), NOW()),
('Banco de Dados II', 60, 3, NOW(), NOW()),
('Integração e Entrega Continua', 60, 3, NOW(), NOW()),
('Internet das Coisas', 60, 4, NOW(), NOW()),
('Aprendizado de Máquina', 60, 4, NOW(), NOW());

-- 5. NOTAS
INSERT INTO "Nota" ("alunoId", "disciplinaId", nota1, nota2, nota3, nota4, nota5, media, situacao, "createdAt", "updatedAt") VALUES
(1, 1, 8.5, 7.0, 9.0, 8.0, 7.5, 8.0, 'Aprovado', NOW(), NOW()),
(1, 5, 6.0, 5.5, 7.0, 6.5, 6.0, 6.2, 'Aprovado', NOW(), NOW()),
(2, 1, 9.0, 8.5, 9.5, 8.0, 9.0, 8.8, 'Aprovado', NOW(), NOW()),
(2, 7, 7.5, 8.0, 7.0, 8.5, 7.0, 7.6, 'Aprovado', NOW(), NOW()),
(3, 2, 4.0, 5.0, 3.5, 4.5, 5.0, 4.4, 'Reprovado', NOW(), NOW()),
(3, 6, 6.5, 7.0, 6.0, 6.5, 7.0, 6.6, 'Aprovado', NOW(), NOW()),
(4, 5, 8.0, 8.5, 7.5, 9.0, 8.0, 8.2, 'Aprovado', NOW(), NOW()),
(4, 6, 5.5, 6.0, 5.0, 4.5, 6.0, 5.4, 'Reprovado', NOW(), NOW()),
(5, 2, 9.5, 9.0, 8.5, 9.0, 9.5, 9.1, 'Aprovado', NOW(), NOW()),
(5, 8, 8.0, 7.5, 8.5, 7.0, 8.0, 7.8, 'Aprovado', NOW(), NOW());



--Verificação de dados cadastrados

-- 1. CONTAGEM GERAL
SELECT 'usuarios' as tabela, COUNT(*) as total FROM usuarios
UNION ALL
SELECT 'Professors', COUNT(*) FROM "Professors"
UNION ALL
SELECT 'Alunos', COUNT(*) FROM "Alunos"
UNION ALL
SELECT 'Disciplinas', COUNT(*) FROM "Disciplinas"
UNION ALL
SELECT 'Nota', COUNT(*) FROM "Nota";

-- 2. RESUMO POR ALUNO 
SELECT 
    a.nome as "Aluno",
    a.matricula as "Matrícula",
    a.curso as "Curso",
    COUNT(n.id) as "Total Disciplinas",
    SUM(CASE WHEN n.situacao = 'Aprovado' THEN 1 ELSE 0 END) as "Aprovadas",
    SUM(CASE WHEN n.situacao = 'Reprovado' THEN 1 ELSE 0 END) as "Reprovadas",
    ROUND(AVG(n.media)::numeric, 2) as "Média Geral"
FROM "Alunos" a
LEFT JOIN "Nota" n ON a.id = n."alunoId"
GROUP BY a.id, a.nome, a.matricula, a.curso
ORDER BY a.nome;

-- 3. DISCIPLINAS COM PROFESSORES
SELECT 
    d.id as "ID",
    d.nome as "Disciplina",
    d."cargaHoraria" as "Carga Horária",
    p.nome as "Professor",
    p.matricula as "Matrícula Professor"
FROM "Disciplinas" d
JOIN "Professors" p ON d."professorId" = p.id
ORDER BY d.id;

-- 4. NOTAS DETALHADAS
SELECT 
    a.nome as "Aluno",
    d.nome as "Disciplina",
    n.nota1,
    n.nota2,
    n.nota3,
    n.nota4,
    n.nota5,
    n.media,
    n.situacao,
    CASE 
        WHEN n.situacao = 'Aprovado' THEN '✅'
        WHEN n.situacao = 'Reprovado' THEN '❌'
        ELSE '⚪'
    END as "Status"
FROM "Nota" n
JOIN "Alunos" a ON n."alunoId" = a.id
JOIN "Disciplinas" d ON n."disciplinaId" = d.id
ORDER BY a.nome, d.nome;

-- 5. ESTATÍSTICAS GERAIS
SELECT 
    COUNT(DISTINCT a.id) as "Total Alunos",
    COUNT(DISTINCT p.id) as "Total Professores",
    COUNT(DISTINCT d.id) as "Total Disciplinas",
    COUNT(n.id) as "Total Notas Lançadas",
    ROUND(AVG(n.media)::numeric, 2) as "Média Geral Turma",
    SUM(CASE WHEN n.situacao = 'Aprovado' THEN 1 ELSE 0 END) as "Total Aprovados",
    SUM(CASE WHEN n.situacao = 'Reprovado' THEN 1 ELSE 0 END) as "Total Reprovados",
    ROUND((SUM(CASE WHEN n.situacao = 'Aprovado' THEN 1 ELSE 0 END)::numeric / 
           COUNT(n.id)::numeric * 100)::numeric, 2) as "Taxa de Aprovação %"
FROM "Alunos" a
CROSS JOIN "Professors" p
CROSS JOIN "Disciplinas" d
LEFT JOIN "Nota" n ON n."alunoId" = a.id;