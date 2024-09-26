const mongoose=require("mongoose");
const CourseFdSchema=new mongoose.Schema({
    feedbackby:{
        type:String
    },
    feedBackToCourse:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course'
    }
})

const CourseFdModel=new mongoose.model("CourseFeedback",CourseFdSchema);
module.exports=CourseFdModel;