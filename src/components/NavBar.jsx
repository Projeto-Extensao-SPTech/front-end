export function NavBar() {
    return (
        <nav className="w-full h-16 bg-[#EFEFEF] flex justify-around items-center shadow-2xl ">
            <img src="/logo_2.svg" alt="" className="w-16" />
            <ul className="flex flex-col text-white gap-4 md:flex-row md:gap-8 items-center">
                <li className="text-primary hover:text-secondary cursor-pointer font-bold transition duration-150 ease-in-out">Sobre</li>
                <li className="text-primary hover:text-secondary cursor-pointer font-bold transition duration-150 ease-in-out">Feiras de Adoção</li>
                <li className="text-primary hover:text-secondary cursor-pointer font-bold transition duration-150 ease-in-out">Doação</li>
                <li className="text-primary hover:text-secondary cursor-pointer font-bold transition duration-150 ease-in-out">Voluntariado</li>
                <li className="text-primary hover:text-secondary cursor-pointer font-bold transition duration-150 ease-in-out">Notificações</li>
                <img src="/icons/notification_icon.svg" alt="" className="w-8 hover:scale-110 transition duration-150 ease-in-out " />
            </ul>

            <div className="h-full flex">
                <button className="text-white, h-full w-12 bg-primary flex justify-center items-center hover:cursor-pointer hover:scale-110 transition duration-150 ease-in-out">
                    <img src="/user-add.svg" alt="" className="w-8" />
                </button>
                <button className="text-white, h-full w-12 bg-secondary flex justify-center items-center hover:cursor-pointer hover:scale-110 transition duration-150 ease-in-out">
                    <img src="/login-icon.svg" alt="" className="w-8" />
                </button>
            </div>

        </nav>
    )
}