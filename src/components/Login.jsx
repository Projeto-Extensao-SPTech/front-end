export function Login() {
    return (
        <nav className="h-16 w-full bg-primary flex justify-center items-center">
            <ul className="flex flex-col text-white gap-4 md:flex-row md:gap-8 items-center">
                <img src="/logo_2.svg" alt="" className="w-12"/>
                <li>Sobre</li>
                <li>Feiras de Adoção</li>
                <li>Doação</li>
                <li>Voluntariado</li>
                <li>Notificações</li>
                <img src="/notification_icon.svg" alt=""  className="w-8"/>
            </ul>

            <button className="text-white, h-full w-12 bg-[#012D71] flex justify-center items-center">
                <img src="/user-add.svg" alt="" className="w-8"/>
            </button>
            <button className="text-white, h-full w-12 bg-[#FFB114] flex justify-center items-center">
                <img src="/login-icon.svg" alt="" className="w-8"/>
            </button>

        </nav>
    )
}