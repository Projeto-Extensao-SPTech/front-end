import { useState } from "react";
import { Login } from "./Login";


export function Card(){

    const [isLogin, setIsLogin] = useState(true);
    return (    
        <div className="w-80 min-h-[400px] bg-white rounded-lg shadow-md flex flex-col items-center gap-8 p-8">
            <div className="flex">
                <button className={`${isLogin ? 'bg-primary text-secondary' : 'bg-secondary text-primary' } w-24 h-8 rounded-l-xl px-4 hover:opacity-90`}
                        onClick={() => setIsLogin(true)}>
                    Login
                </button>
                <button className={`${isLogin ? 'bg-secondary text-primary' : 'bg-primary text-secondary' } w-24 h-8 rounded-r-xl px-4 hover:opacity-90`}
                        onClick={() => setIsLogin(false)}>
                    Cadastro
                </button>
            </div>

            <div className="w-full">
                {isLogin ? <Login /> : <div>Cadastro</div>}
            </div>
        </div>       
    )
}