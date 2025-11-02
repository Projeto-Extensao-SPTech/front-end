
import { useState } from 'react';

export function CardNovaSenha({ onSubmit }) {

    const [novaSenha, setNovaSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        

        if (!novaSenha || !confirmarSenha) {
            alert("Por favor, preencha os dois campos.");
            return;
        }
        if (novaSenha !== confirmarSenha) {
            alert("As senhas não são iguais!");
            return;
        }

        onSubmit(novaSenha);
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl p-8 pt-12 max-w-md w-full text-center z-10 overflow-hidden">
            
            <h2 className="text-2xl font-bold text-[#052759] mb-8">Informe sua nova senha</h2>
            
            <form className="space-y-6 px-4" onSubmit={handleSubmit}>
          
                <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v2H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-1V6a4 4 0 00-4-4zm-2 6V6a2 2 0 114 0v2H8z" clipRule="evenodd" /></svg>
                    </span>
                    <input 
                        type="password" 
                        placeholder="Nova Senha" 
                        className="w-full border border-gray-300 rounded-lg p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={novaSenha}
                        onChange={(e) => setNovaSenha(e.target.value)}
                    />
                </div>

               
                <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v2H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-1V6a4 4 0 00-4-4zm-2 6V6a2 2 0 114 0v2H8z" clipRule="evenodd" /></svg>
                    </span>
                    <input 
                        type="password" 
                        placeholder="Confirmar Senha" 
                        className="w-full border border-gray-300 rounded-lg p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={confirmarSenha}
                        onChange={(e) => setConfirmarSenha(e.target.value)}
                    />
                </div>
                
                <button type="submit" className="w-full bg-[#052759] text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors">
                    Atualizar senha
                </button>
            </form>
            
            <div className="mt-8 -mb-8"> 
                <img 
                    src="/photos/cachorro-recuperacao.png" 
                    className="w-48 mx-auto" 
                    alt="Cachorro" 
                />
            </div>
        </div>
    );
}