require("dotenv").config()

var indexRouter = require("./public/js/entrypoint/index.js")

var PORT_APP = process.env.APP_PORT;
var HOST_APP = process.env.APP_HOST;

var express = require("express");
var app = express();

app.use(express.json());
app.use("/", indexRouter)

app.get("/", (req,res) => {
    res.send("Olá mundo")
}); 

app.listen(PORT_APP, () => {
    console.log(`Servidor rodando em http://localhost:${PORT_APP} \nAmbiente: ${HOST_APP}`)
})