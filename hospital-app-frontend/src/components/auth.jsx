import { useState } from "react";
import { apiFetch } from "./api";
import { Alert, Spinner } from "./helper";


export const AuthPage = ({ onLogin }) => {
  const [mode, setMode] = useState("login"); // login | register
  const [role, setRole] = useState("patient");
  const [form, setForm] = useState({ username: "", password: "", fullName: "", email: "", phone: "", specialization: "", bloodGroup: "", dateOfBirth: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (key, value) => setForm(pre => ({ ...pre, [key]: value }));

  const handleSubmit = async () => {
    setError(""); setLoading(true);
    try {
      if (mode === "login") {
        const data = await apiFetch("/auth/login", { method: "POST", body: JSON.stringify({ username: form.username, password: form.password }) });
        if (!data.success) throw new Error(data.message);
        onLogin(data.token, data.user);
      } else {
        const payload = { username: form.username, password: form.password, fullName: form.fullName, email: form.email, phone: form.phone, role };
        if (role === "doctor") payload.specialization = form.specialization;
        if (role === "patient") {
          payload.bloodGroup = form.bloodGroup;
          payload.dateOfBirth = form.dateOfBirth;
        }
        const data = await apiFetch("/auth/register", { method: "POST", body: JSON.stringify(payload) });
        if (!data.success) throw new Error(data.message);
        onLogin(data.token, data.user);
      }
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">🏥</div>
        <div className="auth-title">{mode === "login" ? "Welcome back" : "Create account"}</div>
        <div className="auth-subtitle">{mode === "login" ? "Sign in to your Medix account" : "Join Medix Hospital System"}</div>

        {mode === "register" && (
          <div className="auth-tabs">
            <button className={`auth-tab ${role === "patient" ? "active" : ""}`} onClick={() => setRole("patient")}>👤 Patient</button>
            <button className={`auth-tab ${role === "doctor" ? "active" : ""}`} onClick={() => setRole("doctor")}>🩺 Doctor</button>
          </div>
        )}

        {error && <Alert>{error}</Alert>}

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {mode === "register" && (
            <>
              <div className="form-group">
                <label>Full Name</label>
                <input placeholder="Dr. Jane Smith" value={form.fullName} onChange={e => set("fullName", e.target.value)} />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="jane@medix.com" value={form.email} onChange={e => set("email", e.target.value)} />
              </div>
              {role === "doctor" && (
                <div className="form-group">
                  <label>Specialization</label>
                  <input placeholder="Cardiologist" value={form.specialization} onChange={e => set("specialization", e.target.value)} />
                </div>
              )}
              {role === "patient" && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div className="form-group">
                    <label>Date of Birth</label>
                    <input type="date" value={form.dateOfBirth} onChange={e => set("dateOfBirth", e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>Blood Group</label>
                    <select value={form.bloodGroup} onChange={e => set("bloodGroup", e.target.value)}>
                      <option value="">Select</option>
                      {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(b => <option key={b}>{b}</option>)}
                    </select>
                  </div>
                </div>
              )}
            </>
          )}
          <div className="form-group">
            <label>Username</label>
            <input placeholder="johndoe" value={form.username} onChange={e => set("username", e.target.value)} />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="••••••••" value={form.password} onChange={e => set("password", e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSubmit()} />
          </div>
          <button className="btn btn-primary" style={{ marginTop: 4, padding: "14px" }} onClick={handleSubmit} disabled={loading}>
            {loading ? <Spinner /> : mode === "login" ? "Sign In" : "Create Account"}
          </button>
        </div>

        <div className="auth-switch">
          {mode === "login" ? <>Don't have an account? <button onClick={() => setMode("register")}>Register</button></> :
            <>Already have an account? <button onClick={() => setMode("login")}>Sign In</button></>}
        </div>
      </div>
    </div>
  );
};