import { useState } from "react";
import { Empty } from "./helper";

export const PatientsPage = ({ patients }) => {
    const [search, setSearch] = useState("");
    const filtered = patients.filter(p =>
        p.fullName.toLowerCase().includes(search.toLowerCase()) ||
        p.email.toLowerCase().includes(search.toLowerCase())
    );
    return (
        <div className="animate-fade-up">
            <div className="page-header">
                <div className="page-title">Patients</div>
                <div className="page-subtitle">All registered patients in the system</div>
            </div>
            <div className="form-group mb-6" style={{ maxWidth: 360 }}>
                <input placeholder="🔍  Search patients..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            {filtered.length === 0 ? (
                <Empty icon="👥" title="No patients found" subtitle="" />
            ) : (
                <div className="table-wrap">
                    <table>
                        <thead><tr><th>Patient</th><th>Email</th><th>Phone</th><th>Blood Group</th><th>Date of Birth</th></tr></thead>
                        <tbody>
                            {filtered.map(p => (
                                <tr key={p._id}>
                                    <td>
                                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,var(--teal),var(--gold))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "var(--navy)" }}>
                                                {p.fullName.charAt(0)}
                                            </div>
                                            <strong>{p.fullName}</strong>
                                        </div>
                                    </td>
                                    <td className="text-muted">{p.email}</td>
                                    <td className="text-muted">{p.phone || "—"}</td>
                                    <td>{p.bloodGroup ? <span className="badge booked">{p.bloodGroup}</span> : "—"}</td>
                                    <td className="text-muted">{p.dateOfBirth ? new Date(p.dateOfBirth).toLocaleDateString() : "—"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};