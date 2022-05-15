import { connectToDatabase } from "../../../lib/mongodb"

export default async function handler(req, res) {

  const{db}=await connectToDatabase()

  const {
    fullName, birthDate, gender,maritalStatus,phoneNumber,email,address,
  } = req.body

  const patients = await db.collection("patients").insertOne(req.body)
  res.status(200).json( req.body)
}
