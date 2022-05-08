import { connectToDatabase } from "../../lib/mongodb";
import bcrypt from "bcrypt"

export default async function handler(req, res) {
    const { db } = await connectToDatabase()

    const name = req.body.name
    const username = req.body.username
    const password = req.body.password

    const user = await db.collection("users").findOne({ username: username })

    if (user != null) {
        return res.status(400).json({ msg: "account already exist" })
    }

    await db.collection("users").insertOne({
        name: name,
        username: username,
        password: await bcrypt.hash(password, 10)
    })
    res.status(200).json({ name, email: username, password });

}

