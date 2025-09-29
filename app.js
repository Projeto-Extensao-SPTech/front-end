import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import path from "path"
import { fileURLToPath } from "url"

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

import indexRouter from "./public/js/entrypoint/index.js"

const PORT_APP = process.env.APP_PORT
const HOST_APP = process.env.APP_HOST

const app = express()

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "public")))
app.use(cors())

// Rotas
app.use("/", indexRouter)
app.get("/", (req, res) => {
    res.send("Olá mundo")
})

// Inicialização
app.listen(PORT_APP, () => {
    console.log(`Servidor rodando em http://localhost:${PORT_APP} \nAmbiente: ${HOST_APP}`)
})
