import cron from 'node-cron';
import scraping from './scraping';
import mongoose from "mongoose";
require('dotenv').config()

const userdb = process.env.DB_USER,
pwdb = process.env.DB_PW,
namedb = process.env.DB_NAME,
url = `mongodb+srv://${userdb}:${pwdb}@cluster0.4qxcs.mongodb.net/${namedb}`

console.log(userdb,pwdb,namedb)

mongoose.connect(url).then(()=>{
    console.log(`mongo connected ${namedb}`);
    cron.schedule('*/1 * * * *', () => {
        scraping()
    });
  }).catch((err) => {
    console.log(err)
    console.log(`error connecting to mongo`)
  })