
import { useState } from 'react';

export function CardVerificarCodigo({ onSubmit }) {

    const [codigo, setCodigo] = useState({ c1: '', c2: '', c3: '', c4: '' });

    const handleInput = (e, nextId, prevId) => {
        const { value, name } = e.target;
 
        setCodigo(prev => ({ ...prev, [name]: value }));

        if (value.length >= 1 && nextId) {
            document.getElementById(nextId).focus();
        }

        if (value.length === 0 && prevId) {
            document.getElementById(prevId).focus();
        }
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const codigoCompleto = `${codigo.c1}${codigo.c2}${codigo.c3}${codigo.c4}`;
  
        if (codigoCompleto.length < 4) {
            alert("Por favor, preencha os 4 dígitos.");
            return;
        }
        
        onSubmit(codigoCompleto); 
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl p-8 pt-12 max-w-md w-full text-center z-10 overflow-hidden">
            
            <h2 className="text-2xl font-bold text-[#052759] mb-4">Insira o código enviado</h2>
            <p className="text-gray-600 mb-8 px-4">Enviamos um código de 4 dígitos para o seu WhatsApp.</p>

            <form className="px-4" onSubmit={handleSubmit}>
                <div className="flex justify-center gap-4 mb-8">
                    <input
                        id="code-1" name="c1"
                        type="tel" maxLength="1"
                        value={codigo.c1}
                        onChange={(e) => handleInput(e, 'code-2', null)}
                        className="w-16 h-16 text-3xl text-center font-bold border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#052759]"
                    />
                    <input
                        id="code-2" name="c2"
                        type="tel" maxLength="1"
                        value={codigo.c2}
                        onChange={(e) => handleInput(e, 'code-3', 'code-1')}
                        className="w-16 h-16 text-3xl text-center font-bold border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#052759]"
                    />
                    <input
                        id="code-3" name="c3"
                        type="tel" maxLength="1"
                        value={codigo.c3}
                        onChange={(e) => handleInput(e, 'code-4', 'code-2')}
                        className="w-16 h-16 text-3xl text-center font-bold border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#052759]"
                    />
                    <input
                        id="code-4" name="c4"
                        type="tel" maxLength="1"
                        value={codigo.c4}
                        onChange={(e) => handleInput(e, null, 'code-3')}
                        className="w-16 h-16 text-3xl text-center font-bold border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#052759]"
                    />
                </div>
                
                <button type="submit" className="w-full bg-[#052759] text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors">
                    Enviar código
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