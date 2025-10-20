import { useState } from "react";
import { Login } from "./Login";
import { NavBar } from "./NavBar";
import { Cadastro } from "./Cadastro";

export function AuthenticationCard() {
    const [isLogin, setIsLogin] = useState(true);

    return (

        <div className="w-full h-screen flex flex-col bg-primary">
            <NavBar />
            <div className="flex-1 flex items-center justify-center h-full relative overflow-hidden">
                <img
                    src="/blob.svg"
                    alt=""
                    className=" w-128 absolute transform rotate-45 z-0 left-70 bottom-40"
                />  
                <img
                    src="/blob.svg"
                    alt=""
                    className=" w-160 absolute transform rotate- z-0 left-10/14 top-40"
                />
                <img
                    src="/photos/dog-photo-1.svg"
                    alt=""
                    className=" w-64 absolute transform rotate- z-0 right-20 bottom-5"
                />

                <div className="w-100 min-h-[400px] bg-white rounded-lg shadow-md flex flex-col items-center gap-8 p-6 z-10 relative">
                    <div className="flex justify-center absolute transform left-1/2 -translate-x-1/2 top-3">
                        <button
                            className={`${isLogin ? 'bg-primary text-secondary' : 'bg-secondary text-primary opacity-70'} cursor-pointer w-24 h-8 rounded-l-xl px-4 hover:opacity-90 mt-4`}
                            onClick={() => setIsLogin(true)}
                        >
                            Login
                        </button>
                        <button
                            className={`${isLogin ? 'bg-secondary text-primary opacity-70' : 'bg-primary text-secondary'} cursor-pointer w-24 h-8 rounded-r-xl px-4 hover:opacity-90`}
                            onClick={() => setIsLogin(false)}
                        >
                            Cadastro
                        </button>
                    </div>

                    <div className="w-full absolute transform top-20 flex flex-col items-center">
                        {isLogin ? <Login /> : <Cadastro />}
                    </div>
                </div>
            </div>
        </div>
    )
}
