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
    const { member_csv, age_range, tier,} = req.body;

    const premium = new Premium({
      member_csv,
      age_range,
      tier,
    });

    const savedPremium = await premium.save();

    res.status(201).json(savedPremium); 
  } catch (error) {
    console.error('Error saving premium data:', error);
    res.status(500).json({ error: 'Internal server error' }); 
  }
});


app.post('/premium', async (req, res) => {
  const {  member_csv, tier,price} = req.body;
  try {
    const premiumData = await  Premium.find({
      member_csv: member_csv,
      tier: tier
    });

    if (premiumData.length > 0) {
      const filteredData = premiumData.map(data => ({
        ageRange: data.age_range,
        memberCsv: data.member_csv,
        tier: data.tier,
        sumInsured: data[price] || 'Sum Insured not found'

      }));

      res.status(200).json(filteredData);
    } else {
      res.status(404).json({ message: 'Data not found for the specified member type and tier' });
    }
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching premium data' });
  }
});

app.patch('/addtocart/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const existingData = await Premium.findById(id);

    if (!existingData) {
      return res.status(404).json({ message: 'Data not found' });
    }

    const updatedAddedStatus = !existingData.AddtoCart;
    existingData.AddtoCart = updatedAddedStatus;
    const updatedData = await existingData.save();

    res.status(200).json({ message: 'Added status updated', data: updatedData });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while updating added status' });
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