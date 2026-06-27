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

  localStorage.setItem(
    "token",
    data.token
  )

  localStorage.setItem(
    "username",
    data.name
  )

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
      background:
        "linear-gradient(135deg,#0f172a,#1e293b,#312e81)"
    }}
  >
    <div
      style={{
        width: "400px",
        padding: "40px",
        borderRadius: "24px",
        background: "rgba(255,255,255,0.08)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.15)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        color: "white"
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "10px"
        }}
      >
        CodeCollab 🚀
      </h1>

      <p
        style={{
          textAlign: "center",
          color: "#cbd5e1",
          marginBottom: "30px"
        }}
      >
        Real-Time Collaborative Coding
      </p>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          width: "100%",
          padding: "14px",
          marginBottom: "15px",
          borderRadius: "12px",
          border: "1px solid rgba(255,255,255,0.15)",
          background: "rgba(255,255,255,0.08)",
          color: "white",
          outline: "none",
          boxSizing: "border-box"
        }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          width: "100%",
          padding: "14px",
          marginBottom: "20px",
          borderRadius: "12px",
          border: "1px solid rgba(255,255,255,0.15)",
          background: "rgba(255,255,255,0.08)",
          color: "white",
          outline: "none",
          boxSizing: "border-box"
        }}
      />

      <button
        onClick={handleLogin}
        style={{
          width: "100%",
          padding: "14px",
          border: "none",
          borderRadius: "12px",
          background:
            "linear-gradient(90deg,#2563eb,#7c3aed)",
          color: "white",
          fontSize: "16px",
          fontWeight: "bold",
          cursor: "pointer"
        }}
      >
        Login
      </button>

      <p
        style={{
          textAlign: "center",
          marginTop: "20px",
          color: "#cbd5e1"
        }}
      >
        Don't have an account?
      </p>

      <button
        onClick={onShowRegister}
        style={{
          width: "100%",
          padding: "12px",
          marginTop: "10px",
          borderRadius: "12px",
          border: "1px solid rgba(255,255,255,0.15)",
          background: "transparent",
          color: "white",
          cursor: "pointer"
        }}
      >
        Create Account
      </button>

    </div>
  </div>
)
  }

  export default Login