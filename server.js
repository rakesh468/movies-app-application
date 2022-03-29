require("dotenv").config()
const express=require("express")
const cors=require("cors")
const fileUpload=require('express-fileupload');
const cookieParser = require('cookie-parser');
const userRouter=require("./routes/userRouter");
const uploadRouter=require("./routes/upload");
const movieRouter=require("./routes/movieRouter");
const categoryRouter=require("./routes/categoryRouter");
const path=require("path")

//db connection//
const connection=require("./db");



const app=express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(fileUpload({
    useTempFiles:true
}))


//routes//
app.use("/user",userRouter);
app.use("/api",uploadRouter);
app.use("/api",movieRouter);
app.use("/api",categoryRouter);

// PORT runnning in 5200//
const PORT=process.env.PORT || 5200;

//Mongodb Connection//
connection(); 


if(process.env.NODE_ENV === "production"){
    app.use(express.static("client/build"))
    app.get("*",(request,response)=>{
        response.sendFile(path.join(__dirname,"client","build","index.html"))
    })
}


app.listen(PORT,()=>console.log("App is Running in",PORT))
