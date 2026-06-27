import { useState } from "react"

function Register({ onShowLogin }) {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleRegister = async () => {

    try {

      const response = await fetch(
        "https://codecollab-backend-i1ns.onrender.com/register",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            name,
            email,
            password
          })
        }
      )

      const data = await response.json()

      alert(data.message)

      if (response.ok) {

        onShowLogin()

      }

    }
    catch (error) {

      alert("Registration failed")

    }

  }

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
      <h1>Create Account 🚀</h1>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{
          padding: "12px",
          marginTop: "15px",
          width: "250px",
          borderRadius: "8px"
        }}
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          padding: "12px",
          marginTop: "10px",
          width: "250px",
          borderRadius: "8px"
        }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          padding: "12px",
          marginTop: "10px",
          width: "250px",
          borderRadius: "8px"
        }}
      />

      <button
        onClick={handleRegister}
        style={{
          marginTop: "15px",
          padding: "10px 20px"
        }}
      >
        Register
      </button>

      <p style={{ marginTop: "20px" }}>
        Already have an account?
      </p>

      <button onClick={onShowLogin}>
        Login
      </button>

    </div>
  )
}

export default Register