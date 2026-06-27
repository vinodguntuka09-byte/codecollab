import { useState, useEffect } from "react"

import { io } from "socket.io-client"

import Login from "./components/Login"
import Register from "./components/Register"
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"
import Chat from "./components/Chat"


const socket = io("https://codecollab-backend-i1ns.onrender.com/")



function App() {

  const [selectedRoom, setSelectedRoom] = useState("")

  const [showRegister, setShowRegister] = useState(false)

  // FINAL USERNAME
  const [username, setUsername] = useState("")

useEffect(() => {

  const savedUser =
    localStorage.getItem("username")

  if (savedUser) {

    setUsername(savedUser)

  }

}, [])

  // INPUT VALUE
  const [usernameInput, setUsernameInput] = useState("")



  // JOIN APP
  const joinApp = () => {

    if (usernameInput.trim() === "") {

      alert("Please enter username")

      return
    }



    setUsername(usernameInput)

  }



  // ENTER KEY SUPPORT
  const handleKeyDown = (event) => {

    if (event.key === "Enter") {

      joinApp()

    }

  }



  // LOGIN SCREEN
  if (username === "") {

  if (showRegister) {
    return (
      <Register
        onShowLogin={() => setShowRegister(false)}
      />
    )
  }

  return (
    <Login
      onShowRegister={() => setShowRegister(true)}
      onLoginSuccess={(name) => setUsername(name)}
    />
  )
}



  return (
    <div>

      <Navbar
  username={username}
  onLogout={() => {

    localStorage.removeItem("token")
    localStorage.removeItem("username")

    setUsername("")

  }}
/>



      <div className="main-layout">

        <Sidebar
          socket={socket}
          selectedRoom={selectedRoom}
          setSelectedRoom={setSelectedRoom}
        />



        <Editor
          socket={socket}
          selectedRoom={selectedRoom}
        />



        <Chat
          socket={socket}
          selectedRoom={selectedRoom}
          username={username}
        />

      </div>

    </div>
  )
}

export default App