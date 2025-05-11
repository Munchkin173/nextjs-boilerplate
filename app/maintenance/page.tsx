"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Maintenance() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    unitNumber: "",
    contactNumber: "",
    email: "",
    serviceType: "none",
    urgencyLevel: "normal",
    preferredDate: "",
    description: "",
    permissionToEnter: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Protect page: if not authenticated, redirect to landing (login) page
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("authenticated");
    if (isAuthenticated !== "true") {
      router.push("/");
    }
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch('/api/maintenance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit maintenance request');
      }
      router.push("/thankyou");
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Logout handler: clears auth and redirects to landing page
  const handleLogout = () => {
    localStorage.removeItem("authenticated");
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-100" style={{ fontFamily: "'Poppins', sans-serif" }}>
      
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

      {/* Maintenance Content */}
      <div style={{ maxWidth: "1000px", margin: "40px auto", padding: "0 20px" }}>
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "12px",
            boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            style={{
              backgroundColor: "#28a745",
              padding: "30px 40px",
              color: "white",
            }}
          >
            <h1 style={{ fontSize: "2.5rem", fontWeight: "600", marginBottom: "10px" }}>
              Maintenance Services
            </h1>
            <p style={{ fontSize: "1.1rem" }}>
              Submit requests for repairs, maintenance, or general inquiries for your residence at The Vera Imperia.
            </p>
          </div>

          {/* Request Form */}
          <div style={{ padding: "30px 40px" }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: "600", color: "#333", marginBottom: "20px" }}>
              Submit a Maintenance Request
            </h2>
            
            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-md">
                {error}
              </div>
            )}
            
            {success && (
              <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-md">
                Your maintenance request has been submitted successfully. We will contact you shortly.
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#444" }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "12px 15px",
                    borderRadius: "8px",
                    border: "1px solid #ddd",
                    fontSize: "1rem",
                  }}
                  placeholder="Your name"
                />
              </div>
              
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#444" }}>
                  Apartment/Unit Number *
                </label>
                <input
                  type="text"
                  name="unitNumber"
                  value={formData.unitNumber}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "12px 15px",
                    borderRadius: "8px",
                    border: "1px solid #ddd",
                    fontSize: "1rem",
                  }}
                  placeholder="e.g., A-1205"
                />
              </div>
              
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#444" }}>
                  Contact Number *
                </label>
                <input
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "12px 15px",
                    borderRadius: "8px",
                    border: "1px solid #ddd",
                    fontSize: "1rem",
                  }}
                  placeholder="Your phone number"
                />
              </div>
              
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#444" }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "12px 15px",
                    borderRadius: "8px",
                    border: "1px solid #ddd",
                    fontSize: "1rem",
                  }}
                  placeholder="Your email"
                />
              </div>
              
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#444" }}>
                  Service Type *
                </label>
                <select
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "12px 15px",
                    borderRadius: "8px",
                    border: "1px solid #ddd",
                    fontSize: "1rem",
                    backgroundColor: "white",
                  }}
                >
                  <option value="none">-- Select a service --</option>
                  <option value="plumbing">Plumbing</option>
                  <option value="electrical">Electrical</option>
                  <option value="hvac">HVAC</option>
                  <option value="appliance">Appliance Repair</option>
                  <option value="housekeeping">Housekeeping</option>
                  <option value="pest">Pest Control</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#444" }}>
                  Urgency Level
                </label>
                <select
                  name="urgencyLevel"
                  value={formData.urgencyLevel}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "12px 15px",
                    borderRadius: "8px",
                    border: "1px solid #ddd",
                    fontSize: "1rem",
                    backgroundColor: "white",
                  }}
                >
                  <option value="normal">Normal - Schedule at convenience</option>
                  <option value="high">High - Needs attention within 24 hours</option>
                  <option value="emergency">Emergency - Immediate attention required</option>
                </select>
              </div>
              
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#444" }}>
                  Preferred Date for Service
                </label>
                <input
                  type="date"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "12px 15px",
                    borderRadius: "8px",
                    border: "1px solid #ddd",
                    fontSize: "1rem",
                  }}
                />
              </div>

              <div style={{ marginBottom: "30px" }}>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#444" }}>
                  Description of Issue *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "12px 15px",
                    borderRadius: "8px",
                    border: "1px solid #ddd",
                    fontSize: "1rem",
                    minHeight: "150px",
                    resize: "vertical",
                  }}
                  placeholder="Please describe the issue in detail..."
                ></textarea>
              </div>

              <div style={{ marginBottom: "30px" }}>
                <label style={{ display: "flex", alignItems: "center", fontWeight: "500", color: "#444", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    name="permissionToEnter"
                    checked={formData.permissionToEnter}
                    onChange={handleInputChange}
                    style={{ marginRight: "10px", width: "18px", height: "18px" }}
                  />
                  Permission to enter residence in your absence if needed
                </label>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    padding: "14px 30px",
                    backgroundColor: "#28a745",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    fontWeight: "600",
                    fontSize: "1.1rem",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#218838")}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#28a745")}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Request'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Emergency Contact Box */}
        <div
          style={{
            backgroundColor: "#f8d7da",
            border: "1px solid #f5c6cb",
            borderRadius: "8px",
            padding: "20px",
            marginTop: "30px",
            display: "flex",
            alignItems: "center",
            gap: "15px",
          }}
        >
          <div
            style={{
              backgroundColor: "#dc3545",
              color: "white",
              fontSize: "1.5rem",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            !
          </div>
          <div>
            <h3 style={{ color: "#721c24", fontWeight: "600", marginBottom: "5px" }}>
              Emergency Contact
            </h3>
            <p style={{ color: "#721c24", margin: 0 }}>
              For emergencies requiring immediate assistance, please call our 24/7 support line: <strong>+91 123 456 7890</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          backgroundColor: "#333",
          color: "white",
          padding: "30px 20px",
          marginTop: "60px",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
          <p>© 2025 The Vera Imperia. All rights reserved.</p>
          <p style={{ fontSize: "0.9rem", marginTop: "10px" }}>
            Email: info@veraimperia.com | Phone: +123 456 7890 | Address: 123 Luxury Avenue, Noida, India
          </p>
        </div>
      </div>
    </div>
  );
}