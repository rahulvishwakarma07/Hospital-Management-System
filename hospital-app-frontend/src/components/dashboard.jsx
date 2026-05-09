import { useAuth } from "./api";
import { Badge, Empty } from "./helper";

export const Dashboard = ({ appointments, doctors, patients }) => {
  const { user } = useAuth();
  const booked = appointments.filter(a => a.status === "booked").length;
  const cancelled = appointments.filter(a => a.status === "cancelled").length;
  const completed = appointments.filter(a => a.status === "completed").length;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const upcoming = appointments.filter(a => a.status === "booked" && new Date(a.appointmentDate) >= today);

  const stats = [
    { icon: "📅", label: "Total Appointments", value: appointments.length, color: "var(--teal)" },
    { icon: "✅", label: "Booked", value: booked, color: "var(--teal)" },
    { icon: "✗", label: "Cancelled", value: cancelled, color: "var(--danger)" },
    { icon: "🩺", label: user.role === "patient" ? "Doctors Available" : "Total Patients", value: user.role === "patient" ? doctors.length : patients.length, color: "var(--gold)" },
  ];

  return (
    <div className="animate-fade-up">
      <div className="page-header">
        <div className="page-title">Good day, {user.fullName.split(" ")[0]} 👋</div>
        <div className="page-subtitle">Here's a quick overview of your medical activity</div>
      </div>

      <div className="stats-grid">
        {stats.map((s, i) => (
          <div className="stat-card" key={i}>
            <div className="stat-icon">{s.icon}</div>
            <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div style={{ fontWeight: 600, fontSize: 16 }}>Upcoming Appointments</div>
        </div>
        {upcoming.length === 0 ? (
          <Empty icon="📋" title="No upcoming appointments" subtitle="Book an appointment to get started" />
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>{user.role === "patient" ? "Doctor" : "Patient"}</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Reason</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {upcoming.slice(0, 5).map(a => (
                  <tr key={a._id}>
                    <td><strong>{user.role === "patient" ? a.doctor?.fullName : a.patient?.fullName}</strong>
                      <div className="text-muted">{user.role === "patient" ? a.doctor?.specialization : a.patient?.email}</div>
                    </td>
                    <td>{new Date(a.appointmentDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</td>
                    <td>{a.timeSlot}</td>
                    <td style={{ maxWidth: 180, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.reason}</td>
                    <td><Badge status={a.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};