
const mongoose= require('mongoose');

const DataShcema= mongoose.Schema({
    member_csv:{
        type:String
    },
    age_range:{
        type:String
    },
    tier:{
        type:String
    },
    Number:{
        type:Number
    }
})

const User = mongoose.model('User',DataShcema);

module.exports=User;