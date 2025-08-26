// src/context/CepContext.tsx
import React, { createContext, useState } from "react";

interface CepData {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
}

interface CepContextData {
  cep: string;
  setCep: (cep: string) => void;
  cepInfo: CepData | null;
  setCepInfo: (info: CepData | null) => void;
  consultas: CepData[]; // lista de consultas válidas
  adicionarConsulta: (info: CepData) => void;
}

export const CepContext = createContext<CepContextData>({} as CepContextData);

export const CepProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cep, setCep] = useState("");
  const [cepInfo, setCepInfo] = useState<CepData | null>(null);
  const [consultas, setConsultas] = useState<CepData[]>([]);

  const adicionarConsulta = (info: CepData) => {
    setConsultas((prev) => [...prev, info]);
  };

  return (
    <CepContext.Provider value={{ cep, setCep, cepInfo, setCepInfo, consultas, adicionarConsulta }}>
      {children}
    </CepContext.Provider>
  );
};
