const mongoose = require('mongoose');

const premiumSchema = new mongoose.Schema({
  SumInsured:{
    type:Number
  },
  Age:{
    type:Number
  },
  CityTier: {
    type:String
  },
  Tenure: {
    type:Number
  },
  PremiumPlan: {
    type:Number
  }
});

const Premium = mongoose.model('Premium', premiumSchema);

module.exports = Premium;
