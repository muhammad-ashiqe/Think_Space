import express from "express"
import { configDotenv } from "dotenv";
import { connectDB } from "./config/db.js";
import authRouter from "./routes/user.route.js";
import blogRouter from "./routes/blog.route.js";

configDotenv();
const app=express();

const PORT = process.env.PORT

app.use(express.json())

//user auth router
app.use('/api/auth',authRouter)

// blog Router
app.use('api/blogs',blogRouter)

app.listen(PORT,async()=>{
  console.log(`server started http://localhost:${PORT} `);
  await connectDB();
})




