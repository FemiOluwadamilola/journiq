require('dotenv').config();
const DB_url = process.env.MONGO_URI;
const dbConnection = (DB) => {
  DB.connect(DB_url,{serverSelectionTimeoutMS: 30000}).then(() => console.log('DATABASE CONNECTION SUCCESSFULLY MADE...'))
  .catch(err => console.log(err.message))
}

module.exports = dbConnection;