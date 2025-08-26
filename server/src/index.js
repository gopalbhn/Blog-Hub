import { app } from "./app.js";
import ConnectDB from "./db/connection.js";
import dotenv from "dotenv";

dotenv.config();
console.log("port",process.env.PORT)
const port = process.env.PORT

ConnectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Application is Running on port ${port}`);
    });
    app.on("error",(error)=>{
        console.log("Express connection error",error)
    })
  })
  .catch((err) => {
    console.log("Internal Server Error", err);
  });
