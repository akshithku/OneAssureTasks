
const mongoose= require('mongoose');

const DataShcema= mongoose.Schema({
    500000: String,
    700000: String,
    1000000: String,
    1500000: String,
    2000000: String,
    2500000: String,
    3000000: String,
    4000000: String,
    5000000: String,
    6000000: String,
    7500000: String,
    member_csv:{
        type:String
    },
    age_range:{
        type:String
    },
    tier:{
        type:String
    },
    AddtoCart:{
        type:Boolean,
    }
})

const User = mongoose.model('User',DataShcema);

module.exports=User;