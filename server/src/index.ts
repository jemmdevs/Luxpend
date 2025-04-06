// NcvH7GEJBrD33sv7

import express, { Express } from "express";
import mongoose from "mongoose";
import financialRecordRouter from "./routes/financial-records";
import cors from "cors";


const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());


const mongoURI: string = "mongodb+srv://jemmdev:NcvH7GEJBrD33sv7@luxpendtfg.wsdb6jd.mongodb.net/";

mongoose
  .connect(mongoURI)
  .then(() => console.log("CONNECTED TO MONGODB!"))
  .catch((err) => console.error("Failed to Connect to MongoDB:", err));

app.use("/financial-records", financialRecordRouter);

app.listen(port, () => {
  console.log(`Server Running on Port ${port}`);
});