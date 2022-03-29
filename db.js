const mongoose=require("mongoose")
const asynchandler=require("./middleware/asynchandler")

module.exports=asynchandler(async()=>{
    const connectionParams={
        useNewUrlParser:true,
        useUnifiedTopology:true
    }
    const connection=await mongoose.connect(process.env.MONGO_URL,connectionParams)
    connection ?
    console.log("Database Connected")
    : console.log("DataBase is not Connected")
})