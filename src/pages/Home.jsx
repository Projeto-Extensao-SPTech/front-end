import Hero from '../components/sections/Hero'
import Participar from '../components/sections/Participar'
import Adotados from '../components/sections/Adotados'
import FaleConosco from '../components/sections/FaleConosco'

export default function Home() {
    return (
        <div>
            <Hero />
            <Participar />
            <Adotados />
            <FaleConosco />
        </div>
    )
}