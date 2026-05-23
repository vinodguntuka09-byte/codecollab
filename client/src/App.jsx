import { useState } from "react"

import { io } from "socket.io-client"

import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"
import Chat from "./components/Chat"

const socket = io("http://localhost:5000")



function App() {

  const [selectedRoom, setSelectedRoom] = useState("")



  // FINAL USERNAME
  const [username, setUsername] = useState("")



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

    return (

      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          backgroundColor: "#0f172a",
          color: "white"
        }}
      >

        <h1>
          Welcome to CodeCollab 🚀
        </h1>



        <input
          type="text"
          placeholder="Enter username..."
          value={usernameInput}
          onChange={(e) => setUsernameInput(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            padding: "12px",
            marginTop: "15px",
            width: "250px",
            borderRadius: "8px",
            border: "1px solid gray",
            outline: "none",
            fontSize: "16px",
            backgroundColor: "#1e293b",
            color: "white"
          }}
        />



        <button
          onClick={joinApp}
          style={{
            marginTop: "15px",
            padding: "10px 20px",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >

          Join

        </button>

      </div>

    )

  }



  return (
    <div>

      <Navbar />



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