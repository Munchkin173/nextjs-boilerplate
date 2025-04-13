"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Fees() {
  const router = useRouter();
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [amount, setAmount] = useState("");

  // Check if user is authenticated; if not, redirect to landing page.
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("authenticated");
    if (isAuthenticated !== "true") {
      router.push("/");
    }
  }, [router]);

  // Handle form submission (simulate payment processing)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Payment processed successfully!");
    // Reset all form fields
    setCardNumber("");
    setExpiryDate("");
    setCvv("");
    setCardName("");
    setSelectedService("");
    setAmount("");
  };

  const handleLogout = () => {
    localStorage.removeItem("authenticated");
    router.push("/");
  };

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <div
        style={{
          backgroundColor: "white",
          borderBottom: "2px solid #eee",
          padding: "15px 20px",
          width: "100%",
          zIndex: 10,
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {/* Left: Home */}
          <Link href="/home" style={{ textDecoration: "none" }}>
            <div style={{ fontWeight: 600, fontSize: "1.3rem", color: "#2a2a2a" }}>Home</div>
          </Link>

          {/* Right: Logout */}
          <button
            onClick={handleLogout}
            style={{
              padding: "10px 22px",
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontWeight: 500,
              fontSize: "0.95rem",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#c82333")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#dc3545")}
          >
            Logout
          </button>
        </div>
      </div>
      
      {/* Fees Payment Form */}
      <div style={styles.formContainer}>
        <h1 style={styles.formHeading}>Service Fee Payment</h1>
        <p style={styles.formSubheading}>
          Please enter your debit card details and select the service you wish to pay for.
        </p>
        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Service Selection */}
          <div style={styles.inputGroup}>
            <label htmlFor="service" style={styles.label}>
              Service Type *
            </label>
            <select 
              id="service" 
              required 
              style={styles.input}
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
            >
              <option value="">-- Select Service --</option>
              <option value="plumbing">Plumbing</option>
              <option value="electrical">Electrical</option>
              <option value="hvac">HVAC</option>
              <option value="appliance">Appliance Repair</option>
              <option value="housekeeping">Housekeeping</option>
              <option value="pest">Pest Control</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Account Number */}
          <div style={styles.inputGroup}>
            <label htmlFor="accountNumber" style={styles.label}>
              Account Number *
            </label>
            <input
              id="accountNumber"
              type="text"
              required
              placeholder="Enter your account number"
              style={styles.input}
            />
          </div>

          {/* Amount */}
          <div style={styles.inputGroup}>
            <label htmlFor="amount" style={styles.label}>
              Amount
            </label>
            <input
              id="amount"
              type="number"
              required
              placeholder="Enter amount"
              style={styles.input}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          {/* Card Details */}
          <div style={styles.inputGroup}>
            <label htmlFor="cardNumber" style={styles.label}>
              Debit Card Number *
            </label>
            <input
              id="cardNumber"
              type="text"
              required
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              style={styles.input}
              value={cardNumber}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                const formatted = value.replace(/(\d{4})/g, '$1 ').trim();
                setCardNumber(formatted);
              }}
            />
          </div>

          <div style={styles.cardDetailsRow}>
            <div style={styles.cardDetailGroup}>
              <label htmlFor="expiryDate" style={styles.label}>
                Expiry Date (MM/YY) *
              </label>
              <input
                id="expiryDate"
                type="text"
                required
                placeholder="MM/YY"
                maxLength={5}
                style={styles.input}
                value={expiryDate}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  if (value.length <= 4) {
                    const formatted = value.replace(/(\d{2})/, '$1/');
                    setExpiryDate(formatted);
                  }
                }}
              />
            </div>

            <div style={styles.cardDetailGroup}>
              <label htmlFor="cvv" style={styles.label}>
                CVV *
              </label>
              <input
                id="cvv"
                type="text"
                required
                placeholder="123"
                maxLength={3}
                style={styles.input}
                value={cvv}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  setCvv(value);
                }}
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="cardName" style={styles.label}>
              Name on Card *
            </label>
            <input
              id="cardName"
              type="text"
              required
              placeholder="Enter name as it appears on card"
              style={styles.input}
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
            />
          </div>

          <button type="submit" style={styles.submitButton}>
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    fontFamily: "'Montserrat', sans-serif",
    backgroundColor: "#f0f4f8",
    minHeight: "100vh",
    paddingBottom: "40px",
  },
  formContainer: {
    maxWidth: "600px",
    margin: "100px auto 0",
    backgroundColor: "white",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
  },
  formHeading: {
    textAlign: "center",
    fontSize: "2.5rem",
    marginBottom: "20px",
    color: "#2d3748",
  },
  formSubheading: {
    textAlign: "center",
    fontSize: "1.2rem",
    marginBottom: "30px",
    color: "#4a5568",
    fontStyle: "italic",
  },
  form: {
    width: "100%",
  },
  inputGroup: {
    marginBottom: "20px",
  },
  cardDetailsRow: {
    display: "flex",
    gap: "20px",
    marginBottom: "20px",
  },
  cardDetailGroup: {
    flex: 1,
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontWeight: 500,
    color: "#4a5568",
  },
  input: {
    width: "100%",
    padding: "12px 15px",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    fontSize: "1rem",
    transition: "all 0.3s ease",
  },
  submitButton: {
    width: "100%",
    padding: "14px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "1.1rem",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
};