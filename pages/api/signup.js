import { connectToDatabase } from "../../lib/mongodb";
import bcrypt from "bcrypt"
// import Joi from "joi"
// import { Schema } from "joi";
const Joi = require('joi');
export default async function handler(req, res) {
    const { db } = await connectToDatabase()

    const { name, username, password } = req.body
    const schema = Joi.object({
        name: Joi.string()
            .min(3)
            .max(30)
            .required(),
        username: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),
        password: Joi.string()
            .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
            repeat_password: Joi.ref("password"),
    })
    //  t
    try {

        await schema.validateAsync(req.body)

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
    } catch (err) {
        res.status(400).json({msg: err.details[0].message});

    }

}

