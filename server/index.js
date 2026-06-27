const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const User = require("./models/User")
const http = require("http")

const { Server } = require("socket.io")

const fs = require("fs")
const path = require("path")

const { exec } = require("child_process")

const { v4: uuidv4 } = require("uuid")



const app = express()

const server = http.createServer(app)



const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://codecollab-three.vercel.app"
    ]
  }
})



app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://codecollab-three.vercel.app"
    ]
  })
)
app.use(express.json())

//REGISTER API

app.post("/register", async (req, res) => {

  try {

    const { name, email, password } = req.body

    const existingUser = await User.findOne({
      email
    })

    if (existingUser) {

      return res.status(400).json({
        message: "Email already exists"
      })

    }

    const user = new User({

      name,
      email,
      password

    })

    await user.save()

    res.json({
      message: "User registered successfully"
    })

  }
  catch (error) {

    console.log(error)

    res.status(500).json({
      message: "Server Error"
    })

  }

})

//LOGIN API

app.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) {

      return res.status(400).json({
        message: "User not found"
      })

    }

    if (user.password !== password) {

      return res.status(400).json({
        message: "Invalid password"
      })

    }

    res.json({
      message: "Login successful",
      name: user.name
    })

  }
  catch (error) {

    console.log(error)

    res.status(500).json({
      message: "Server Error"
    })

  }

})




// DATABASE CONNECTION
mongoose.connect("mongodb+srv://vinny09:Varun04@cluster0.d4e5xqo.mongodb.net/?appName=Cluster0")
  .then(() => {

    console.log("MongoDB connected ✅")

  })
  .catch((error) => {

    console.log(error)

  })
// ROOM MODEL
const Room = mongoose.model("Room", {

  name: String

})



// SOCKET CONNECTION
io.on("connection", (socket) => {

  console.log("User connected 🔥")



  // JOIN ROOM
  socket.on("join_room", (roomName) => {

    socket.join(roomName)

    console.log(`User joined ${roomName}`)

  })



  // CHAT MESSAGE
  socket.on("send_message", (data) => {

    io.to(data.room).emit("receive_message", data)

  })



  // REAL-TIME CODE
  socket.on("code_change", (data) => {

    socket.to(data.room).emit("receive_code", data)

  })



  socket.on("disconnect", () => {

    console.log("User disconnected ❌")

  })

})



// HOME ROUTE
app.get("/", (request, response) => {

  response.send("Backend server is running 🚀")

})



// GET ROOMS
app.get("/rooms", async (request, response) => {

  const rooms = await Room.find()

  response.json(rooms)

})



// CREATE ROOM
app.post("/rooms", async (request, response) => {

  const newRoom = new Room({

    name: request.body.name

  })

  await newRoom.save()

  response.json({
    message: "Room created successfully"
  })

})



// RUN CODE
app.post("/run-code", (request, response) => {

  const code = request.body.code



  // CREATE TEMP FILE
  const fileName = `${uuidv4()}.js`

  const filePath = path.join(__dirname, fileName)



  fs.writeFileSync(filePath, code)



  // EXECUTE FILE
  exec(`node ${filePath}`, (error, stdout, stderr) => {

    // DELETE TEMP FILE
    fs.unlinkSync(filePath)



    if (error) {

      return response.json({

        output: error.message

      })

    }



    if (stderr) {

      return response.json({

        output: stderr

      })

    }



    response.json({

      output: stdout

    })

  })

})



server.listen(5000, () => {

  console.log("Server running at http://localhost:5000")

})