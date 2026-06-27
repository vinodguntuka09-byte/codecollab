function Login({ onShowRegister }) {
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
        style={{
          padding: "12px",
          marginTop: "10px",
          width: "250px",
          borderRadius: "8px"
        }}
      />

      <button
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