import { useEffect, useState } from "react"



function Chat({ socket, selectedRoom, username }) {

  const [message, setMessage] = useState("")



  // STORE MESSAGES ROOM-WISE
  const [messagesByRoom, setMessagesByRoom] = useState({})



  const sendMessage = () => {

    if (message.trim() === "") return



    if (selectedRoom === "") {

      alert("Please select a room")

      return
    }



    socket.emit("send_message", {

      room: selectedRoom,
      username: username,
      message: message

    })



    setMessage("")

  }



  useEffect(() => {

    const receiveMessage = (data) => {



      setMessagesByRoom((previous) => {

        return {

          ...previous,

          [data.room]: [

            ...(previous[data.room] || []),

            data

          ]

        }

      })

    }



    socket.on("receive_message", receiveMessage)



    return () => {

      socket.off("receive_message", receiveMessage)

    }

  }, [socket])



  const handleKeyDown = (event) => {

    if (event.key === "Enter") {

      sendMessage()

    }

  }



  // CURRENT ROOM MESSAGES
  const currentRoomMessages =

    messagesByRoom[selectedRoom] || []



  return (
    <div className="chat">

      <h3>
        Team Chat
      </h3>



      <p>
        Username:
        {" "}
        {username}
      </p>



      <p>
        Current Room:
        {" "}
        {selectedRoom || "No room selected"}
      </p>



      <div className="messages">

        {currentRoomMessages.map((msg, index) => (

          <div className="message" key={index}>

            <strong>
              {msg.username}
            </strong>

            :
            {" "}

            {msg.message}

            </div>
            

        ))}

      </div>



      <input
        type="text"
        placeholder="Send message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
      />



      <button onClick={sendMessage}>
        Send
      </button>

    </div>
  )
}

export default Chat