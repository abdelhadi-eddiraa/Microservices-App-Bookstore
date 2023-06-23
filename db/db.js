const mongosse=require('mongoose');
const dotenv=require('dotenv')
dotenv.config();
const url=process.env.URL


const Dbconnect=async()=>{
    
      const connect=await mongosse.connect(process.env.URL)
      console.log('database connected succes')
   
  

}


module.exports=Dbconnect