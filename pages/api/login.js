import { connectToDatabase } from "../../lib/mongodb"
const Joi = require('joi');
import bcrypt from "bcrypt"

export default async function handler(req, res) {
    const {db} = await connectToDatabase()

    const {username, password} = req.body

    const schema = Joi.object({
        username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

       password: Joi.string()
       .pattern(new RegExp("^[a-zA-Z0-9]{3,30}"))
    })
    try{
        await schema.validateAsync(req.body)

        const user = await db.collection("users").findOne({username: username})

    if (user != null){
        if (await bcrypt.compare(password,user.password)){
            return res.status(200).json({email:user.email, name:user.name, username:user.username})

        }else {
            return res.status(400).json({msg: "invalid username or password"})
        }
    }

   return res.status(400).json({ msg: 'invalid username or password' })

    }catch(err){
        res.status(400).json({msg: err.details[0].message});

    }

    }
