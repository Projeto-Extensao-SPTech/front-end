import Participar from '../components/sections/Participar'
import Adotados from '../components/sections/Adotados'
import FaleConosco from '../components/sections/FaleConosco'
import BemVindos from '../components/sections/BemVindos'

export default function Home() {
    return (
        <div>
            <BemVindos />
            <Participar />
            <Adotados />
            <FaleConosco />
        </div>
    )
}