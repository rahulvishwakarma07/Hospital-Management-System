import { useAuth } from "./api";

export const ProfilePage = () => {
  const { user } = useAuth();
  return (
    <div className="animate-fade-up">
      <div className="page-header">
        <div className="page-title">My Profile</div>
        <div className="page-subtitle">Your account information</div>
      </div>
      <div className="card" style={{maxWidth:540}}>
        <div style={{display:"flex",alignItems:"center",gap:20,marginBottom:28,paddingBottom:24,borderBottom:"1px solid var(--border)"}}>
          <div style={{width:64,height:64,borderRadius:18,background:"linear-gradient(135deg,var(--teal),var(--gold))",display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,fontWeight:700,color:"var(--navy)",flexShrink:0}}>
            {user.fullName.charAt(0)}
          </div>
          <div>
            <div style={{fontWeight:600,fontSize:20}}>{user.fullName}</div>
            <div className="text-muted">@{user.username}</div>
            <span className={`role-badge ${user.role}`} style={{marginTop:6,display:"inline-block"}}>{user.role}</span>
          </div>
        </div>
        <div style={{display:"grid",gap:20}}>
          {[
            {label:"Email",value:user.email||"—"},
            {label:"Role",value:user.role.charAt(0).toUpperCase()+user.role.slice(1)},
            {label:"User ID",value:user.id||user._id},
          ].map(({label,value})=>(
            <div key={label}>
              <div style={{fontSize:11,fontWeight:600,letterSpacing:"0.5px",textTransform:"uppercase",color:"var(--muted)",marginBottom:4}}>{label}</div>
              <div style={{fontSize:14}}>{value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};