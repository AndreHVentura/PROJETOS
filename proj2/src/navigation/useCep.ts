import { useContext } from "react";
import { CepContext } from "../context/CepContext";

export const useCep = () => {
  return useContext(CepContext);
};