import { useEffect, useState } from "react"

function Sidebar({ socket, selectedRoom, setSelectedRoom }) {

  const [rooms, setRooms] = useState([])
  const [newRoom, setNewRoom] = useState("")



  const fetchRooms = () => {

    fetch("https://codecollab-backend-i1ns.onrender.com/rooms")
      .then((response) => response.json())
      .then((data) => {
        setRooms(data)
      })

  }



  useEffect(() => {

    fetchRooms()

  }, [])



  const createRoom = () => {

    if (newRoom.trim() === "") return



    fetch("https://codecollab-backend-i1ns.onrender.com/rooms", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        name: newRoom
      })

    })
      .then((response) => response.json())
      .then(() => {

        fetchRooms()

        setNewRoom("")

      })

  }



  const joinRoom = (roomName) => {

    socket.emit("join_room", roomName)

    setSelectedRoom(roomName)

  }



  return (
    <div className="sidebar">

      <h3>Rooms</h3>



      <input
        type="text"
        placeholder="Create room..."
        value={newRoom}
        onChange={(e) => setNewRoom(e.target.value)}
      />



      <button onClick={createRoom}>
        Add Room
      </button>



      <ul>

        {rooms.map((room) => (

          <li
            key={room._id}
            onClick={() => joinRoom(room.name)}
            style={{
              cursor: "pointer",
              color:
                selectedRoom === room.name
                  ? "yellow"
                  : "white"
            }}
          >

            {room.name}

          </li>

        ))}

      </ul>

    </div>
  )
}

export default Sidebar