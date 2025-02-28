//---- step : 1.1
const express = require("express")
const app = express()
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const emailRoutes = require("./routes/mailRoutes");
const cors = require('cors');

//---- step : 3
const multer = require("multer")
const path = require("path")

//---- step : 2.1
const authRoute = require("./routes/auth")
const authUser = require("./routes/user")
const authPost = require("./routes/posts")
const authCat = require("./routes/categories")
const authPrint = require("./routes/prints")

//---- step : 1
dotenv.config()
//---- step : 2.2
app.use(express.json())
//---- step : 2.3 last ma file crate garne time
app.use("/images", express.static(path.join(__dirname, "/images")))
//----
app.use(bodyParser.json());
app.use(cors());

//---- step : 1.3
mongoose
  .connect(`mongodb+srv://Plex:yB5IypOrbkvzz2a2@cluster0.ywpsiuq.mongodb.net/node-blog?retryWrites=true&w=majority`)
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err))

//---- step : 3
const storage = multer.diskStorage({
  destination: (req, file, callb) => {
    callb(null, "images")
  },
  filename: (req, file, callb) => {
    //callb(null, "file.png")
    callb(null, req.body.name)
  },
})
const upload = multer({ storage: storage })
app.post("/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded")
})



//---- step : 2
app.use("/auth", authRoute)
app.use("/users", authUser)
app.use("/posts", authPost)
app.use("/category", authCat)
app.use("/print", authPrint)

//---- mail
//app.use("/email", emailRoutes);


//---- step : 1.2
app.listen("5000", () => {
  console.log("backend running...")
})
