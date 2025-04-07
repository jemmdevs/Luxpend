import express, { Express } from "express";
import mongoose from "mongoose";
import financialRecordRouter from "./routes/financial-records";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3001;

// Configurar middleware para parsear JSON correctamente
app.use(express.json());
app.use(cors());

// Ocultar credenciales en una variable de entorno en producción
const mongoURI: string = "mongodb+srv://jemmdev:NcvH7GEJBrD33sv7@luxpendtfg.wsdb6jd.mongodb.net/";

// Mejorar el manejo de la conexión a MongoDB
mongoose
  .connect(mongoURI, {
    // Opciones de conexión explícitas para mayor compatibilidad
  })
  .then(() => console.log("CONNECTED TO MONGODB!"))
  .catch((err) => {
    console.error("Failed to Connect to MongoDB:", err);
    process.exit(1); // Terminar el proceso si no se puede conectar a la base de datos
  });

// Verificar eventos de conexión
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

app.use("/financial-records", financialRecordRouter);

app.listen(port, () => {
  console.log(`Server Running on Port ${port}`);
});