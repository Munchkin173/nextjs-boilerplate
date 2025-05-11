"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("authenticated") === "true") {
      router.push("/home");
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username === "admin" && password === "verapass123") {
      localStorage.setItem("authenticated", "true");
      router.push("/home");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>
          Welcome to <em style={styles.brandEmphasis}>The Vera Imperia</em>
        </h2>
        <p style={styles.subheading}>
          Luxury living awaits — please login to continue
        </p>

        <p style={{ textAlign: "center", color: "#4a5568", fontSize: "0.95rem", marginTop: "-1rem", marginBottom: "1.5rem" }}>
        <strong>Login:</strong> Username: <code>admin</code> &nbsp;|&nbsp; Password: <code>verapass123</code>
        </p>

        {error && <p style={styles.error}>{error}</p>}

        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Username</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="verapass123"
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

// Inline CSS Styles
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // Soft overlay + background image
    background: "linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), url('/images/Background_image.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    fontFamily: "'Montserrat', sans-serif",
  },
  card: {
    background: "rgba(255, 255, 255, 1)",
    backdropFilter: "blur(8px)",
    padding: "3rem",
    borderRadius: "20px",
    maxWidth: "480px",
    width: "90%",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.12)",
    color: "#2d3748",
    transition: "transform 0.3s ease",
  },
  heading: {
    fontSize: "2.4rem",
    fontWeight: 600,
    textAlign: "center",
    marginBottom: "0.5rem",
    color: "#1a365d",
    letterSpacing: "-0.5px",
    fontFamily: "'Montserrat', sans-serif",
    fontStyle: "italic",
  },
  brandEmphasis: {
    fontStyle: "normal", // keep the "The Vera Imperia" text not slanted
    color: "#2b6cb0",
  },
  subheading: {
    fontSize: "1.05rem",
    textAlign: "center",
    marginBottom: "2rem",
    color: "#4a5568",
    fontStyle: "italic",
  },
  error: {
    color: "#e53e3e",
    textAlign: "center",
    marginBottom: "1.5rem",
    fontSize: "0.95rem",
    padding: "1rem",
    borderRadius: "8px",
    backgroundColor: "rgba(229, 62, 62, 0.1)",
  },
  form: {
    marginTop: "1rem",
  },
  inputGroup: {
    marginBottom: "1.75rem",
  },
  label: {
    display: "block",
    marginBottom: "0.75rem",
    fontWeight: 500,
    color: "#4a5568",
    fontSize: "1rem",
  },
  input: {
    width: "100%",
    padding: "1rem 1.25rem",
    borderRadius: "10px",
    border: "1px solid #e2e8f0",
    outline: "none",
    fontSize: "1.05rem",
    backgroundColor: "#f8fafc",
    color: "#2d3748",
    transition: "all 0.3s ease",
  },
  button: {
    width: "100%",
    padding: "1.1rem",
    background: "linear-gradient(90deg, #4299e1, #3182ce)",
    border: "none",
    borderRadius: "10px",
    fontSize: "1.05rem",
    fontWeight: 600,
    color: "white",
    cursor: "pointer",
    boxShadow: "0 4px 15px rgba(66, 153, 225, 0.2)",
    transition: "all 0.3s ease",
  },
};