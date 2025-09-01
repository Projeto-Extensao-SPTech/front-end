import express from "express"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const router = express.Router()

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../html/client-side/home.html"))
})

export default router

// Esse arquivo é o ponto de inicio do projeto. 
// Assim que o NPM START rodar, o link irá enviar pro home.html