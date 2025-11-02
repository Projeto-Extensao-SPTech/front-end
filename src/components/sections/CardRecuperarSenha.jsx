export function CardRecuperarSenha({ telefone, onTelefoneChange, onSubmit }) {
    

    const handleSubmit = (event) => {
        event.preventDefault(); 
        onSubmit(); 
    };
    
    return (
        <div className="bg-white rounded-2xl shadow-xl p-8 pt-12 max-w-md w-full text-center z-10 overflow-hidden">
            
            <h2 className="text-2xl font-bold text-[#052759] mb-8">Recuperação de senha</h2>
            
            <form className="space-y-6 px-4" onSubmit={handleSubmit}>
                <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C6.84 18 2 13.16 2 7.5V3z"></path></svg>
                    </span>
                    <input 
                        type="tel" 
                        placeholder="Insira seu telefone (Ex: 119...)" 
                        className="w-full border border-gray-300 rounded-lg p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        

                        value={telefone} 
                        onChange={(e) => onTelefoneChange(e.target.value)} 
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