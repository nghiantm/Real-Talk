const express = require("express");
const cors = require('cors');
const { MongoClient } = require("mongodb");
require('dotenv').config();
const port = process.env.PORT || 6969;

// Set up Mongo
let db;
async function setUpMongo() {
    const uri = process.env.CONNECTION_STRING;
    const client = new MongoClient(uri);
    try {
        await client.connect();
    } catch(e) {
        console.error(e);
    }
    db = client.db("RealTalk");
    return db;
}
setUpMongo();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));
server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

// insertProfile
app.post("/api/profiles", async (req, res) => {
    const profiles = await db.collection("profiles");
    const { 
        email, 
        name,
        nativeLanguage, 
        learnLanguage,
        knownLanguages,
        interests,
        learningGoal
    } = req.body;
    const query = { email: email };
    const update = {
        $set: {
            email: email,
            name: name,
            nativeLanguage: nativeLanguage,
            learnLanguage: learnLanguage,
            knownLanguages: knownLanguages,
            interests: interests,
            learningGoal: learningGoal
        }
    }
    const options = { upsert: true };

    try {
        const insertedId = await profiles.updateOne(query, update, options);
        res.status(201).json({ insertedId });
    } catch (error) {
        res.status(500).json({ error: "Failed to insert profile" });
    }
})
// END insertProfile

// getProfile
app.get("/api/profiles", async (req, res) => {
    const profile = await db.collection("profiles");
    const email = req.query.email;
    const query = { email: email };

    try {
        const result = await profile.findOne(query);
        res.status(200).json({result});
    } catch (error) {
        res.status(500).json({ error: "Failed to get profile" });
    }
})

app.post("/api/chats", async (req, res) => {
    const chats = db.collection("chats");
    const { email, proficiencyLevel, messages } = req.body;
    const query = { email: email };

    // Prepare the $set operation based on fields present in req.body
    const update = {};
    if (proficiencyLevel !== undefined) {
        update.proficiencyLevel = proficiencyLevel;
    }
    if (messages !== undefined) {
        update.messages = messages;
    }

    const options = { upsert: true };

    try {
        const result = await chats.updateOne(query, { $set: update }, options);

        if (result.upsertedCount > 0) {
            res.status(201).json({ insertedId: result.upsertedId._id });
        } else {
            res.status(200).json({ message: "Chat updated successfully" });
        }
    } catch (err) {
        console.error("Failed to insert or update chat", err);
        res.status(500).json({ error: "Failed to insert or update chat" });
    }
})

app.get("/api/chats", async (req, res) => {
    const chats = await db.collection("chats");
    const email = req.query.email;
    const query = { email: email };

    try {
        const result = await chats.findOne(query);
        res.status(200).json({ result });
    } catch (err) {
        res.status(500).json({ error: "Failed to get chat" });
    }
})

app.post('/api/levels', async (req, res) => {
    try {
      const { email, value } = req.body;
  
      // Insert new number with associated email into the collection
      await db.collection('levels').insertOne({ email, value, createdAt: new Date() });
  
      // Remove oldest numbers if total count exceeds 5 for the same email
      const numbers = await db.collection('levels').find({ email }).sort({ createdAt: 1 }).toArray();
      if (numbers.length > 5) {
        const oldestNumbers = numbers.slice(0, numbers.length - 5); // Get the oldest numbers to remove
        const oldestIds = oldestNumbers.map(num => num._id);
        await db.collection('levels').deleteMany({ _id: { $in: oldestIds } });
    }
  
      res.status(201).json({ message: 'Number added successfully' });
    } catch (error) {
      console.error('Error adding number:', error);
      res.status(500).json({ error: 'Failed to add number' });
    }
});

// Express route to get recent values and calculate total for a specific email
app.get('/api/levels/:email', async (req, res) => {
    try {
      const { email } = req.params;
  
      // Retrieve the most recent 5 numbers associated with the email
      const numbers = await db.collection('levels')
        .find({ email })
        .sort({ createdAt: -1 }) // Sort by createdAt in descending order to get the most recent first
        .limit(5) // Limit to 5 records
        .toArray();
  
      // Calculate the total value of the retrieved numbers
      const total = numbers.reduce((acc, num) => acc + num.value, 0);
        const average = Math.round(total / numbers.length);
  
      res.status(200).json({ average });
    } catch (error) {
      console.error('Error fetching numbers:', error);
      res.status(500).json({ error: 'Failed to fetch numbers' });
    }
  });