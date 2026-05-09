import { useState } from "react";
import { BookModal } from "./book";
import { Badge, Empty } from "./helper";
import { useAuth } from "./api";


export const AppointmentsPage = ({ appointments, onCancel, onBook, doctors }) => {
  const { user } = useAuth();
  const [filter, setFilter] = useState("all");
  const [showBook, setShowBook] = useState(false);

  const filtered = filter.toLowerCase()==="all" ? appointments : appointments.filter(a=>a.status.toLowerCase()===filter.toLowerCase());
  const handleBooked = (appt) => { setShowBook(false); onBook(appt); };

  return (
    <div className="animate-fade-up">
      {showBook && <BookModal doctors={doctors} onClose={()=>setShowBook(false)} onBooked={handleBooked} />}
      <div className="page-header flex items-center justify-between" style={{flexWrap:"wrap",gap:16}}>
        <div>
          <div className="page-title">Appointments</div>
          <div className="page-subtitle">Manage your scheduled visits</div>
        </div>
        {user.role==="patient" && (
          <button className="btn btn-primary" onClick={()=>setShowBook(true)}>＋ Book Appointment</button>
        )}
      </div>

      <div className="flex gap-2 mb-6" >
        {["All","Booked","Cancelled"].map(s=>(
          <button key={s} className={`btn btn-ghost btn-sm ${filter===s?"active":""}`}
            style={filter===s?{background:"var(--teal-glow)",borderColor:"rgba(14,165,160,0.3)",color:"var(--teal-bright)"}:{}}
            onClick={()=>setFilter(s)}>
            {s}
          </button>
        ))}
      </div>

      {filtered.length===0 ? (
        <Empty icon="🗓" title="No appointments found" subtitle={filter==="all"?"You haven't booked any appointments yet":`No ${filter} appointments`} />
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>{user.role==="patient"?"Doctor":"Patient"}</th>
                <th>Date & Time</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(a=>(
                <tr key={a._id}>
                  <td>
                    <strong>{user.role==="patient" ? a.doctor?.fullName : a.patient?.fullName}</strong>
                    <div className="text-muted">{user.role==="patient" ? a.doctor?.specialization||"General" : a.patient?.email}</div>
                  </td>
                  <td>
                    <div>{new Date(a.appointmentDate).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}</div>
                    <div className="text-muted">{a.timeSlot}</div>
                  </td>
                  <td style={{maxWidth:200}}>
                    <div style={{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{a.reason}</div>
                    {a.notes && <div className="text-muted" style={{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{a.notes}</div>}
                  </td>
                  <td><Badge status={a.status} /></td>
                  <td>
                    {a.status==="booked" && (
                      <button className="btn btn-danger btn-sm" onClick={()=>onCancel(a._id)}>Cancel</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};