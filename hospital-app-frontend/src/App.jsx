import { useState } from 'react'
import './App.css'
import { Dashboard } from './components/dashboard'
import { AppointmentsPage } from './components/appointment'
import { DoctorsPage } from './components/doctor'
import { PatientsPage } from './components/patient'
import { ProfilePage } from './components/profile'
import { apiFetch, AuthContext } from './components/api'
import { useEffect } from 'react'
import { AuthPage } from './components/auth'
import { styles } from './components/style'
import { Spinner } from './components/helper'

function App() {
  const [token, setToken] = useState(() => localStorage.getItem("medix_token"));
  const [user, setUser] = useState(() => { try { return JSON.parse(localStorage.getItem("medix_user") || "null"); } catch { return null; } });
  const [page, setPage] = useState("dashboard");
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };


  const onLogin = (t, u) => {
    setToken(t); setUser(u);
    localStorage.setItem("medix_token", t);
    localStorage.setItem("medix_user", JSON.stringify(u));
  };
  const onLogout = () => {
    setToken(null); setUser(null);
    localStorage.removeItem("medix_token");
    localStorage.removeItem("medix_user");
  };

  useEffect(() => {
    if (!token) return;

    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      try {
        const [appts, docs, pats] = await Promise.all([
          apiFetch("/appointments", {}, token),
          apiFetch("/users/doctors", {}, token),
          apiFetch("/users/patients", {}, token),
        ]);

        if (!isMounted) return;

        if (appts.success) setAppointments(appts.data);
        if (docs.success) setDoctors(docs.data);
        if (pats.success) setPatients(pats.data);
      } catch (e) {
        console.error(e);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [token]);



  const cancelAppt = async (id) => {
    const data = await apiFetch(`/appointments/${id}/cancel`, { method: "PUT" }, token);
    if (data.success) {
      setAppointments(a => a.map(x => x._id === id ? { ...x, status: "cancelled" } : x));
      showToast("Appointment cancelled");
    } else showToast(data.message, "error");
  };

  const handleBooked = (appt) => {
    setAppointments(a => [appt, ...a]);
    showToast("Appointment booked successfully!");
    setPage("appointments");
  };

  if (!token || !user) return (
    <>
      <style>{styles}</style>
      <AuthPage onLogin={onLogin} />
    </>
  );

  const navItems = [
    { id: "dashboard", icon: "◈", label: "Dashboard" },
    { id: "appointments", icon: "📅", label: "Appointments" },
    { id: "doctors", icon: "🩺", label: "Doctors" },
    ...(user.role === "doctor" ? [{ id: "patients", icon: "👥", label: "Patients" }] : []),
    { id: "profile", icon: "👤", label: "Profile" },
  ];

  return (
    <AuthContext.Provider value={{ token, user }}>
      <style>{styles}</style>
      <div className="app-shell">
        {/* Toast */}
        {toast && (
          <div className='toaster' style={{
            position: "fixed", bottom: 24, right: 24, zIndex: 300,
            padding: "12px 20px", borderRadius: 12, fontSize: 14, fontWeight: 500,
            background: toast.type === "success" ? "rgba(16,185,129,0.95)" : "rgba(244,63,94,0.95)",
            color: "#fff", boxShadow: "var(--shadow)", animation: "fadeUp 0.3s ease",
            display: "flex", alignItems: "center", gap: 8, backdropFilter: "blur(8px)"
          }}>
            {toast.type === "success" ? "✓" : "⚠"} {toast.msg}
          </div>
        )}

        {/* Topbar */}
        <header className="topbar">
          <div className="topbar-brand">
            <div className="brand-icon">🏥</div>
            <div className="brand-name">Me<span>dix</span></div>
          </div>
          <div className="topbar-right">
            <div className="user-pill">
              <div className="user-avatar">{user.fullName.charAt(0)}</div>
              <span className="user-name">{user.fullName.split(" ")[0]}</span>
              <span className={`role-badge ${user.role}`}>{user.role}</span>
            </div>
            <button className="btn btn-ghost btn-sm" onClick={onLogout}>Sign out</button>
          </div>
        </header>

        <div className="content-area">
          {/* Sidebar */}
          <nav className="sidebar">
            <div className="sidebar-label">Navigation</div>
            {navItems.map(n => (
              <button key={n.id} className={`nav-item ${page === n.id ? "active" : ""}`} onClick={() => setPage(n.id)}>
                <span className="nav-icon">{n.icon}</span>{n.label}
              </button>
            ))}
            <div style={{ marginTop: "auto", paddingTop: 24 }}>
              <div className="sidebar-label">System</div>
              <button className="nav-item" onClick={onLogout}>
                <span className="nav-icon">→</span>Sign Out
              </button>
            </div>
          </nav>

          {/* Main */}
          <main className="main-panel">
            {loading && page === "dashboard" ? (
              <div style={{ display: "flex", justifyContent: "center", paddingTop: 80 }}><Spinner /></div>
            ) : (
              <>
                {page === "dashboard" && <Dashboard appointments={appointments} doctors={doctors} patients={patients} />}
                {page === "appointments" && <AppointmentsPage appointments={appointments} onCancel={cancelAppt} onBook={handleBooked} doctors={doctors} />}
                {page === "doctors" && <DoctorsPage doctors={doctors} onBook={handleBooked} />}
                {page === "patients" && user.role === "doctor" && <PatientsPage patients={patients} />}
                {page === "profile" && <ProfilePage />}
              </>
            )}
          </main>
        </div>
      </div>
    </AuthContext.Provider>
  );
}

export default App
