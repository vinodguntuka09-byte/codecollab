import { useState } from "react"

function Login({ onShowRegister, onLoginSuccess }) {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async () => {

    try {

      const response = await fetch(
        "https://codecollab-backend-i1ns.onrender.com/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            email,
            password
          })
        }
      )

      const data = await response.json()

      alert(data.message)

      if (response.ok) {

        onLoginSuccess(data.name)

      }

    }
    catch (error) {

      alert("Login failed")

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
      <h1>Login to CodeCollab 🚀</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          padding: "12px",
          marginTop: "15px",
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
        onClick={handleLogin}
        style={{
          marginTop: "15px",
          padding: "10px 20px"
        }}
      >
        Login
      </button>

      <p style={{ marginTop: "20px" }}>
        Don't have an account?
      </p>

      <button onClick={onShowRegister}>
        Register
      </button>

    </div>
  )
}

export default Login