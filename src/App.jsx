import './App.css'
import { Login } from './components/Login'
import { NavBar } from './components/NavBar'
import { Card } from './components/Card'
function App() {
    return (
        <div className="w-full h-screen flex flex-col bg-primary">
            <NavBar />
            <div className="flex-1 flex items-center justify-center">
                <Card />
            </div>
        </div>
    )
}

export default App
