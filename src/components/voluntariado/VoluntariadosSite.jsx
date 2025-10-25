import React from "react";
import NavbarSite from "../navbar/NavbarSite";
import Voluntariados from "./Voluntariados";

function VoluntariadosSite({ onNavigateToHome, onNavigateToVoluntariados, onNavigateToLogin, onNavigateToCadastro }) {

    return (
        <div>
            <NavbarSite
                onNavigateToHome={onNavigateToHome}
                onNavigateToVoluntariados={onNavigateToVoluntariados}
                onNavigateToLogin={onNavigateToLogin}
                onNavigateToCadastro={onNavigateToCadastro}
                />

            <main>
                <section id="voluntariados"><Voluntariados /></section>
            </main>
        </div>
    )

}
export default VoluntariadosSite;