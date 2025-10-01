export function NavBar() {
    return (
        <nav className="h-16 w-full bg-primary flex justify-around items-center shadow-2xl border-b-4 border-secondary">
            <img src="/logo_2.svg" alt="" className="w-16" />
            <ul className="flex flex-col text-white gap-4 md:flex-row md:gap-8 items-center">
                <li className="hover:text-secondary cursor-pointer font-bold">Sobre</li>
                <li className="hover:text-secondary cursor-pointer font-bold">Feiras de Adoção</li>
                <li className="hover:text-secondary cursor-pointer font-bold">Doação</li>
                <li className="hover:text-secondary cursor-pointer font-bold">Voluntariado</li>
                <li className="hover:text-secondary cursor-pointer font-bold">Notificações</li>
                <img src="/notification_icon.svg" alt="" className="w-8" />
            </ul>

            <div className="h-full flex">
                <button className="text-white, h-full w-12 bg-primary flex justify-center items-center hover:cursor-pointer">
                    <img src="/user-add.svg" alt="" className="w-8" />
                </button>
                <button className="text-white, h-full w-12 bg-secondary flex justify-center items-center hover:cursor-pointer">
                    <img src="/login-icon.svg" alt="" className="w-8" />
                </button>
            </div>

        </nav>
    )
}