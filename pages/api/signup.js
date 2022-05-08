import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(req, res) {
    const { db } = await connectToDatabase()

    const name = req.body.name
    const email = req.body.email
    const password = req.body.password

    await db.collection("users").insertOne({name: name,
        email, password})
    res.status(200).json({ name, email: email, password });

}

