import  { useState } from 'react';
import { apiFetch, useAuth } from './api';
import { Alert, Spinner } from './helper';

const TIME_SLOTS = ['09:00 AM','09:30 AM','10:00 AM','10:30 AM','11:00 AM','11:30 AM','12:00 PM','12:30 PM','01:00 PM','01:30 PM','02:00 PM','02:30 PM','03:00 PM','03:30 PM','04:00 PM','04:30 PM','05:00 PM'];

export const BookModal = ({ doctors, onClose, onBooked }) => {
  const { token } = useAuth();
  const [form, setForm] = useState({ doctorId:"", appointmentDate:"", timeSlot:"", reason:"", notes:"" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (k,v) => setForm(f=>({...f,[k]:v}));

  const submit = async () => {
    if (!form.doctorId||!form.appointmentDate||!form.timeSlot||!form.reason) { setError("Please fill all required fields"); return; }
    setLoading(true); setError("");
    try {
      const data = await apiFetch("/appointments", { method:"POST", body: JSON.stringify(form) }, token);
      if (!data.success) throw new Error(data.message);
      onBooked(data.data);
    } catch(e) { setError(e.message); }
    finally { setLoading(false); }
  };

  return (
    <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="modal">
        <div className="modal-header">
          <div className="modal-title">Book Appointment</div>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        {error && <Alert>{error}</Alert>}
        <div style={{display:"flex",flexDirection:"column",gap:16}}>
          <div className="form-group">
            <label>Select Doctor *</label>
            <select value={form.doctorId} onChange={e=>set("doctorId",e.target.value)}>
              <option value="">— Choose a doctor —</option>
              {doctors.map(d=><option key={d._id} value={d._id}>{d.fullName} {d.specialization?`· ${d.specialization}`:""}</option>)}
            </select>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
            <div className="form-group">
              <label>Date *</label>
              <input type="date" value={form.appointmentDate} onChange={e=>set("appointmentDate",e.target.value)} min={new Date().toISOString().split("T")[0]} />
            </div>
            <div className="form-group">
              <label>Time Slot *</label>
              <select value={form.timeSlot} onChange={e=>set("timeSlot",e.target.value)}>
                <option value="">— Select time —</option>
                {TIME_SLOTS.map(t=><option key={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Reason *</label>
            <input placeholder="e.g. Regular checkup, Fever" value={form.reason} onChange={e=>set("reason",e.target.value)} />
          </div>
          <div className="form-group">
            <label>Additional Notes</label>
            <textarea rows={3} placeholder="Any additional information..." value={form.notes} onChange={e=>set("notes",e.target.value)} style={{resize:"vertical"}} />
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={submit} disabled={loading}>
            {loading ? <Spinner /> : "✓ Confirm Booking"}
          </button>
        </div>
      </div>
    </div>
  );
};