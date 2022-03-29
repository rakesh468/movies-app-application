const mongoose=require("mongoose");

const movieSchema=new mongoose.Schema({
   movie_id:{
       type:String,
       unique:true,
       trim:true,
       required:true
   },
   title:{
       type:String,
       required:true,
       trim:true
   },
   rating:{
       type:String,
       required:true,
       trim:true

   },
   summary:{
       type:String,
       required:true,
       trim:true
   },
   images:{
       type:Object,
       required:true
   },
   checked:{
       type:Boolean,
       default:false
   },
   trailer:{
       type:String,
       required:true
   },
   category:{
       type:String,
       required:true
   }

},{
    timestamps:true
})

module.exports=new mongoose.model("Movies",movieSchema)