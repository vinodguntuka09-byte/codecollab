function Navbar({ username, onLogout }) {

  return (
    <div
      className="navbar"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 25px"
      }}
    >

      <div>

        <h2>
          CodeCollab
        </h2>

        <p>
          Real-Time Collaborative Coding
        </p>

      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "15px"
        }}
      >

        <span>
          Welcome {username} 👋
        </span>

        <button
          onClick={onLogout}
          style={{
            padding: "10px 18px",
            border: "none",
            borderRadius: "10px",
            background:
              "linear-gradient(90deg,#2563eb,#7c3aed)",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Logout
        </button>

      </div>

    </div>
  )
}

export default Navbar