export const Spinner = () => <div className="spinner" />;

export const Alert = ({ type = "error", children }) => (
  <div className={`alert alert-${type}`}>
    <span>{type === "error" ? "⚠" : "✓"}</span>
    <span>{children}</span>
  </div>
);

export const Badge = ({ status }) => (
  <span className={`badge ${status}`}>{status}</span>
);

export const Empty = ({ icon, title, subtitle }) => (
  <div className="empty">
    <div className="empty-icon">{icon}</div>
    <div className="empty-title">{title}</div>
    <div>{subtitle}</div>
  </div>
);