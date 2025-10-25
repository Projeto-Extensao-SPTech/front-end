import { createContext, useContext, useState } from "react";

const PatrocinadoresContext = createContext(null);

export function PatrocinadoresProvider({ children }) {
    const [telaAtual, setTelaAtual] = useState("apoio");
    return (
        <PatrocinadoresContext.Provider value={{ telaAtual, setTelaAtual }}>
            {children}
        </PatrocinadoresContext.Provider>
    );
}

export function usePatrocinadores() {
    const ctx = useContext(PatrocinadoresContext);
    if (!ctx) throw new Error("usePatrocinadores must be used within PatrocinadoresProvider");
    return ctx;
}