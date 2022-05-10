import { connectToDatabase } from "../../lib/mongodb"
import bcrypt from "bcrypt"

export default async function handler(req, res) {
    const {db} = await connectToDatabase()

    const {username, password} = req.body
    // const password = req.body.password

    const user = await db.collection("users").findOne({username: username})

    if (user != null){
        if (await bcrypt.compare(password,user.password)){
            return res.status(200).json({email:user.email, name:user.name, username:user.username})

        }else {
            return res.status(400).json({msg: "invalid username or password"})
        }
    }

   return res.status(400).json({ msg: 'invalid username or password' })
  }
