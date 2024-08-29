import express from "express";
import colors from "colors";
import cors, { CorsOptions } from "cors";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerSpec, { swaggerUiOptions } from "./config/swagger";
import router from "./router";
import db from "./config/db";

// Conectar a Base de Datos
export async function connectDB() {
  try {
    await db.authenticate()
    db.sync()
    // console.log(colors.blue.bold("Conexión exitosa a la Base de Datos"))
  } catch (error) {
    // console.log(error)
    console.log(colors.red.bold("Hubo un error al conectar a la Base de Datos"))
  }
}

connectDB()

// Instancia de Express
const server = express()

// Permitir Conexiones
const corsOptions : CorsOptions = {
  origin: function(origin, callback) {
    if(origin === process.env.FRONTEND_URL || process.env.BACKEND_URL) {
      callback(null, true)
    } else {
      callback(new Error("Error de CORS"))
    }
  }
}
server.use(cors(corsOptions))

// Leer datos de formularios
server.use(express.json())

server.use(morgan("dev"))

server.use("/api/products", router)

// server.get("/api", (req, res) => {
//   res.json({msg: "Desde API"})
// })

// Docs
server.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions))

export default server