const express = require("express");
const routes = require("../routes");
const cors = require("cors");

const app = express();
const port = 8000;

app.use(cors({
    origin: ['http://localhost:3000']
}));

app.use(express.json());

routes(app);
app.listen(port, () => console.log("Servidor OK!"));
module.exports = app;