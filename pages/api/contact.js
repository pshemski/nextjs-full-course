// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, name, message } = req.body;

    if (
      !email ||
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !message ||
      message.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid input.' });
    }

    const newMessage = {
      email,
      name,
      message,
    };

    let client;

    const urlConnectionString = `mongodb+srv://${process.env.mongodbUsername}:${process.env.mongodbPassword}@${process.env.mongodbClusterName}.dalmlw3.mongodb.net/${process.env.mongodbDatabase}?retryWrites=true&w=majority`;

    try {
      client = await MongoClient.connect(urlConnectionString);
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message || 'Connection to database failed!' });
      return;
    }

    const db = client.db();

    try {
      const result = await db.collection('messages').insertOne(newMessage);
      newMessage._id = result.insertedId;
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message || 'Storing message failed!' });
      return;
    }

    client.close();

    res
      .status(201)
      .json({ message: 'Successfully stored message!!!', message: newMessage });
  }
}
