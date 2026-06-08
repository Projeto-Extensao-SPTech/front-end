export function CardRecuperarSenha({ email, onEmailChange, onSubmit }) {
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
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                    </span>
                    <input
                        type="email"
                        placeholder="Insira seu e-mail"
                        className="w-full border border-gray-300 rounded-lg p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={email}
                        onChange={(e) => onEmailChange(e.target.value)}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-[#052759] text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
                >
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
