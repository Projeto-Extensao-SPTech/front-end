import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVoluntariados } from "./hooks/useVoluntariados";
import { useScrollReveal } from "./hooks/useScrollReveal";
import VoluntariadoHeader from "./components/VoluntariadoHeader";
import VoluntariadoForm from "./components/VoluntariadoForm";
import VoluntariadoSidebar from "./components/VoluntariadoSidebar";

export default function Voluntariados() {
    const navigate = useNavigate();
    const { formData, errors, handleChange, handleSubmit } = useVoluntariados();

    const [headerRef, headerVisible] = useScrollReveal(0.1);
    const [formRef, formVisible] = useScrollReveal(0.1);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            const userDataString = sessionStorage.getItem("USER_DATA");
            if (!userDataString) {
                navigate('/auth?mode=login');
            }
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-[#F5F5F5] to-[#E8E8E8]">
            <VoluntariadoHeader headerRef={headerRef} headerVisible={headerVisible} />

            <div className="max-w-6xl mx-auto px-4 pt-8 pb-2">
                <div
                    ref={formRef}
                    className={`bg-[#052759] rounded-xl shadow-2xl overflow-hidden transition-all duration-700 ${
                        formVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
                    }`}
                >
                    <div className="grid lg:grid-cols-[1.2fr,0.8fr]">
                        <VoluntariadoForm
                            formData={formData}
                            errors={errors}
                            onChange={handleChange}
                            onSubmit={handleSubmit}
                        />
                        <VoluntariadoSidebar />
                    </div>
                </div>
            </div>
        </div>
    );
}