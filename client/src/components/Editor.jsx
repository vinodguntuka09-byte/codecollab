import { useEffect, useState } from "react"

import EditorComponent from "@monaco-editor/react"



function Editor({ socket, selectedRoom }) {

  // STORE CODE ROOM-WISE
  const [codeByRoom, setCodeByRoom] = useState({})



  // OUTPUT STATE
  const [output, setOutput] = useState("")



  // GET CURRENT ROOM CODE
  const currentCode =

    codeByRoom[selectedRoom] || "// Write your JavaScript code here..."



  // HANDLE TYPING
  const handleCodeChange = (value) => {

    const newCode = value || ""



    // UPDATE LOCAL STATE
    setCodeByRoom((previous) => {

      return {

        ...previous,

        [selectedRoom]: newCode

      }

    })



    // SEND TO SOCKET
    socket.emit("code_change", {

      room: selectedRoom,
      code: newCode

    })

  }



  // RECEIVE REAL-TIME CODE
  useEffect(() => {

    const receiveCode = (data) => {



      setCodeByRoom((previous) => {

        return {

          ...previous,

          [data.room]: data.code

        }

      })

    }



    socket.on("receive_code", receiveCode)



    return () => {

      socket.off("receive_code", receiveCode)

    }

  }, [socket])



  // RUN CODE
  const runCode = async () => {

    if (selectedRoom === "") {

      alert("Please select a room")

      return
    }



    try {

      const response = await fetch(
        "http://localhost:5000/run-code",
        {

          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            code: currentCode
          })

        }
      )



      const data = await response.json()



      setOutput(data.output)

    }
    catch (error) {

      setOutput("Error running code")

    }

  }



  return (
    <div className="editor">

      <h3>
        Code Editor
      </h3>



      <p>
        Current Room:
        {" "}
        {selectedRoom || "No room selected"}
      </p>



      <EditorComponent
        height="400px"
        theme="vs-dark"
        language="javascript"
        value={currentCode}
        onChange={handleCodeChange}
      />



      <button onClick={runCode}>
        Run Code
      </button>



      <div className="output-box">

  <h4>
    Output
  </h4>

  <pre>
    {output}
  </pre>

</div>

    </div>
  )
}

export default Editor