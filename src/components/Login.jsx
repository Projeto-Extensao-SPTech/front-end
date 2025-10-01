export function Login() {
    return (
         <div className="w-full flex flex-col gap-4 justify-center items-center">
                <input 
                    type="text" 
                    placeholder="Email" 
                    id="input_email"
                    className="w-64 p-2 border rounded-lg text-m"
                />
                <input 
                    type="password" 
                    placeholder="Senha"
                    id="input_senha"
                    className="w-64 p-2 border rounded-lg"
                />
            </div>
    )
}