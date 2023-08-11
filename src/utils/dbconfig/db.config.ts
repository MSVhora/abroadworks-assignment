import mongoose from 'mongoose'
const DB_HOST: any = process.env.DB_HOST
const DB_NAME: any = process.env.DB_NAME
const DB_USER: any = process.env.DB_USER
const DB_PASSWORD: any = process.env.DB_PASSWORD

class Database {
   public async connect() {
      const uri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`
      await mongoose.connect(uri)
   }
}

const mongooseDb = new Database()
export default mongooseDb
