import { useState } from "react";
import { BookModal } from "./book";
import { Empty } from "./helper";
import { useAuth } from "./api";

export const DoctorsPage = ({ doctors, onBook }) => {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const filtered = doctors.filter(d =>
    d.fullName.toLowerCase().includes(search.toLowerCase()) ||
    (d.specialization||"").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="animate-fade-up">
      {selectedDoctor && (
        <BookModal
          doctors={[selectedDoctor]}
          onClose={()=>setSelectedDoctor(null)}
          onBooked={appt=>{ setSelectedDoctor(null); onBook && onBook(appt); }}
        />
      )}
      <div className="page-header">
        <div className="page-title">Doctors</div>
        <div className="page-subtitle">Browse our medical specialists</div>
      </div>
      <div className="form-group mb-6" style={{maxWidth:360}}>
        <input placeholder="🔍  Search by name or specialization..." value={search} onChange={e=>setSearch(e.target.value)} />
      </div>
      {filtered.length===0 ? (
        <Empty icon="🩺" title="No doctors found" subtitle="Try a different search" />
      ) : (
        <div className="doctors-grid">
          {filtered.map(d=>(
            <div className="doctor-card" key={d._id}>
              <div className="doctor-avatar">{d.fullName.charAt(0)}</div>
              <div className="doctor-name">{d.fullName}</div>
              <div className="doctor-spec">{d.specialization || "General Practitioner"}</div>
              <div className="doctor-email">{d.email}</div>
              {d.phone && <div className="text-muted" style={{marginTop:4}}>📞 {d.phone}</div>}
              {user.role==="patient" && (
                <button className="btn btn-primary btn-sm" style={{marginTop:16,width:"100%"}} onClick={()=>setSelectedDoctor(d)}>
                  Book Appointment
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};