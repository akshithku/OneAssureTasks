const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
require("dotenv").config();

const Premium = require('./DataShcema');

const DataModel = require('./Model')


const port = process.env.PORT || 3000; // Use a default port if PORT is not specified in .env

app.use(cors());
app.use(express.json());

mongoose.set("strictQuery", false);

mongoose.connect(process.env.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  family: 4,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


app.post('/data', async (req, res) => {
  try {
    const { member_csv, age_range, tier, Number } = req.body;

    const premium = new Premium({
      member_csv,
      age_range,
      tier,
      Number,
    });

    const savedPremium = await premium.save();

    res.status(201).json(savedPremium); 
  } catch (error) {
    console.error('Error saving premium data:', error);
    res.status(500).json({ error: 'Internal server error' }); 
  }
});




// app.post('/premium', async (req, res) => {
//   try {
//     const { sumInsured, age, cityTier, tenure, Premiums } = req.body;

   
//     const DataList = new DataModel({
//       sumInsured,
//       age,
//       cityTier,
//       tenure,
//       Premiums
//     });

//     const savedPremium = await DataList.save();

//     res.status(201).json(savedPremium);
//     return savedPremium;
//   } catch (error) {
//     console.error('Error in saving list data:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

app.post('/premium', async (req, res) => {
  try {
    const { SumInsured, Age, CityTier, Tenure, PremiumPlan } = req.body;

    // Create a new Premium instance
    const premium = new DataModel({
      SumInsured,
      Age,
      CityTier,
      Tenure,
      PremiumPlan
    });

    const savedPremium = await premium.save();

    // Send a response with the saved data as JSON
    res.status(201).json(savedPremium);
  } catch (error) {
    console.error('Error saving premium data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



app.get('/user', async(req, res) => {
  const data= await Premium.find();
  res.send(data);
});

app.get('/age',async(req,res)=>{
  const list = await Premium.find().select("member_csv age_range tier Number")
  res.send(list);
})