import express from "express"
import { configDotenv } from "dotenv";
import { connectDB } from "./config/db.js";
import authRouter from "./routes/user.route.js";

const app=express();
configDotenv();

const PORT = process.env.PORT

app.use(express.json())
app.use('/api/auth',authRouter)



app.listen(PORT,async()=>{
  console.log(`server started http://localhost:${PORT} `);
  await connectDB()
})