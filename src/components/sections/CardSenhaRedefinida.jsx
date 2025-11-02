export function CardSenhaRedefinida({ onIrParaLogin }) {
    return (
        <div className="bg-white rounded-2xl shadow-xl p-8 pt-12 max-w-md w-full text-center z-10 overflow-hidden">
    
            <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>

            <h2 className="text-2xl font-bold text-[#052759] mb-4">Senha alterada!</h2>
            
            <p className="text-gray-600 mb-8 px-4">
                Sua senha foi redefinida com sucesso. Você já pode fazer o login com sua nova senha.
            </p>

            <button 
                onClick={onIrParaLogin} 
                className="w-full bg-[#052759] text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
            >
                Ir para o Login
            </button>
            
            {/* Cachorrinho */}
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