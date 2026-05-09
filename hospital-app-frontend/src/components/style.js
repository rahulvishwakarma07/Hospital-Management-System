export const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --navy: #0a1628;
    --navy-mid: #112240;
    --navy-light: #1a3155;
    --teal: #0ea5a0;
    --teal-bright: #14c8c2;
    --teal-glow: rgba(14,165,160,0.18);
    --gold: #f0b429;
    --gold-soft: rgba(240,180,41,0.12);
    --white: #f8fafc;
    --muted: #94a3b8;
    --border: rgba(255,255,255,0.08);
    --card: rgba(255,255,255,0.04);
    --danger: #f43f5e;
    --success: #10b981;
    --radius: 16px;
    --radius-sm: 10px;
    --shadow: 0 8px 32px rgba(0,0,0,0.4);
    --transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  }

  html, body { height: 100vh;
  overflow: hidden; font-family: 'DM Sans', sans-serif; }

  body {
    background: var(--navy);
    color: var(--white);
    line-height: 1.6;
    overflow-x: hidden;
  }

  /* ── Background mesh ── */
  // body::before {
  //   content: '';
  //   position: fixed;
  //   inset: 0;
  //   background:
  //     radial-gradient(ellipse 80% 50% at 20% 10%, rgba(14,165,160,0.12) 0%, transparent 60%),
  //     radial-gradient(ellipse 60% 60% at 80% 80%, rgba(240,180,41,0.06) 0%, transparent 60%),
  //     radial-gradient(ellipse 40% 40% at 50% 50%, rgba(17,34,64,0.8) 0%, transparent 100%);
  //   pointer-events: none;
  //   z-index: 0;
  // }

  // #root { position: relative; z-index: 1; }

  /* ── Animations ── */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; } to { opacity: 1; }
  }
  @keyframes pulse-ring {
    0%   { box-shadow: 0 0 0 0 rgba(14,165,160,0.4); }
    70%  { box-shadow: 0 0 0 12px rgba(14,165,160,0); }
    100% { box-shadow: 0 0 0 0 rgba(14,165,160,0); }
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  @keyframes shimmer {
    0%   { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }

  .animate-fade-up { animation: fadeUp 0.5s ease both; }
  .animate-fade-in { animation: fadeIn 0.3s ease both; }

  
  /* ── Layout ── */
  .app-shell {
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  /* ── Topbar ── */
  .topbar {
    position: sticky; top: 0; z-index: 100;
    backdrop-filter: blur(20px);
    background: rgba(10,22,40,0.85);
    border-bottom: 1px solid var(--border);
    padding: 0 40px;
    height: 68px;
    display: flex; align-items: center; justify-content: space-between;
  }
  .topbar-brand { display: flex; align-items: center; gap: 12px; }
  .brand-icon {
    width: 38px; height: 38px; border-radius: 10px;
    background: linear-gradient(135deg, var(--teal), #0d7a77);
    display: flex; align-items: center; justify-content: center;
    font-size: 18px;
    box-shadow: 0 4px 16px rgba(14,165,160,0.3);
  }
  .brand-name {
    font-family: 'Instrument Serif', serif;
    font-size: 20px; letter-spacing: -0.3px;
    color: var(--white);
  }
  .brand-name span { color: var(--teal); }
  .topbar-right { display: flex; align-items: center; gap: 16px; }
  .user-pill {
    display: flex; align-items: center; gap: 10px;
    background: var(--card); border: 1px solid var(--border);
    border-radius: 100px; padding: 6px 16px 6px 8px;
    font-size: 13px; color: var(--muted);
  }
  .user-avatar {
    width: 30px; height: 30px; border-radius: 50%;
    background: linear-gradient(135deg, var(--teal), var(--gold));
    display: flex; align-items: center; justify-content: center;
    font-size: 12px; font-weight: 600; color: var(--navy);
  }
  .user-name { color: var(--white); font-weight: 500; }
  .role-badge {
    font-size: 10px; font-weight: 600; letter-spacing: 0.5px;
    text-transform: uppercase; padding: 2px 8px; border-radius: 100px;
  }
  .role-badge.patient { background: var(--gold-soft); color: var(--gold); }
  .role-badge.doctor  { background: var(--teal-glow); color: var(--teal-bright); }

  /* ── Sidebar + Main ── */
  .content-area {
    display: flex;
    flex: 1;
    min-height: 0;
    overflow: hidden;
  }

  .sidebar {
    width: 220px;
    flex-shrink: 0;
    padding: 28px 16px;
    border-right: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    gap: 4px;
    background: rgba(10,22,40,0.5);

    /* REMOVE sticky */
    position: relative;

    /* FIX HEIGHT */
    height: 100%;

    /* ONLY SIDEBAR SCROLLS */
    overflow-y: auto;
  }
  .sidebar-label {
    font-size: 10px; font-weight: 600; letter-spacing: 1.5px;
    text-transform: uppercase; color: var(--muted);
    padding: 0 12px; margin: 16px 0 8px;
  }
  .sidebar-label:first-child { margin-top: 0; }
  .nav-item {
    display: flex; align-items: center; gap: 10px;
    padding: 10px 12px; border-radius: var(--radius-sm);
    font-size: 14px; font-weight: 500; color: var(--muted);
    cursor: pointer; border: none; background: none; width: 100%;
    text-align: left; transition: var(--transition);
  }
  .nav-item:hover { background: var(--card); color: var(--white); }
  .nav-item.active {
    background: var(--teal-glow); color: var(--teal-bright);
    border: 1px solid rgba(14,165,160,0.2);
  }
  .nav-icon { font-size: 16px; width: 20px; text-align: center; }

  /* ── Main panel ── */
  .main-panel {
    flex: 1;
    padding: 40px;

    /* IMPORTANT FIX */
    overflow-y: auto;
    overflow-x: hidden;

    min-height: 0;

  }

  .main-panel::-webkit-scrollbar {
    display: none;
  }

  /* ── Page header ── */
  .page-header { margin-bottom: 32px; }
  .page-title {
    font-family: 'Instrument Serif', serif;
    font-size: 32px; line-height: 1.2; letter-spacing: -0.5px;
  }
  .page-subtitle { font-size: 14px; color: var(--muted); margin-top: 4px; }

  /* ── Cards ── */
  .card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 24px;
    backdrop-filter: blur(12px);
  }
  .card:hover { border-color: rgba(255,255,255,0.14); }

  .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px; margin-bottom: 32px; }
  .stat-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 22px; position: relative; overflow: hidden;
    transition: var(--transition);
  }
  .stat-card::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, var(--accent-color,var(--teal)) 0%, transparent 70%);
    opacity: 0.05; pointer-events: none;
  }
  .stat-card:hover { transform: translateY(-2px); border-color: var(--accent-color,var(--teal)); box-shadow: 0 8px 24px rgba(0,0,0,0.3); }
  .stat-icon { font-size: 24px; margin-bottom: 12px; }
  .stat-value { font-size: 32px; font-weight: 600; line-height: 1; }
  .stat-label { font-size: 12px; color: var(--muted); margin-top: 4px; text-transform: uppercase; letter-spacing: 0.5px; }

  /* ── Tables ── */
  .table-wrap { overflow-x: auto; border-radius: var(--radius); border: 1px solid var(--border); }
  table { width: 100%; border-collapse: collapse; }
  thead { background: rgba(255,255,255,0.03); }
  th { font-size: 11px; font-weight: 600; letter-spacing: 0.8px; text-transform: uppercase; color: var(--muted); padding: 14px 20px; text-align: left; border-bottom: 1px solid var(--border); }
  td { padding: 16px 20px; font-size: 14px; border-bottom: 1px solid var(--border); transition: var(--transition); }
  tr:last-child td { border-bottom: none; }
  tr:hover td { background: rgba(255,255,255,0.02); }

  .badge {
    display: inline-flex; align-items: center; gap: 5px;
    font-size: 11px; font-weight: 600; letter-spacing: 0.3px;
    padding: 4px 10px; border-radius: 100px;
  }
  .badge::before { content: ''; width: 5px; height: 5px; border-radius: 50%; background: currentColor; }
  .badge.booked   { background: rgba(14,165,160,0.15); color: var(--teal-bright); }
  .badge.cancelled{ background: rgba(244,63,94,0.15); color: var(--danger); }
  .badge.completed{ background: rgba(16,185,129,0.15); color: var(--success); }

  /* ── Buttons ── */
  .btn {
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    padding: 10px 20px; border-radius: var(--radius-sm);
    font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500;
    cursor: pointer; border: none; transition: var(--transition); white-space: nowrap;
  }
  .btn:disabled { opacity: 0.5; cursor: not-allowed; }
  .btn-primary {
    background: linear-gradient(135deg, var(--teal), #0d7a77);
    color: var(--white);
    box-shadow: 0 4px 16px rgba(14,165,160,0.3);
  }
  .btn-primary:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(14,165,160,0.4); }
  .btn-ghost {
    background: var(--card); border: 1px solid var(--border);
    color: var(--muted);
  }
  .btn-ghost:hover { color: var(--white); border-color: rgba(255,255,255,0.2); }
  .btn-danger {
    background: rgba(244,63,94,0.1); border: 1px solid rgba(244,63,94,0.2);
    color: var(--danger);
  }
  .btn-danger:hover { background: rgba(244,63,94,0.2); }
  .btn-sm { padding: 6px 14px; font-size: 12px; }

  /* ── Forms ── */
  .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .form-group { display: flex; flex-direction: column; gap: 8px; }
  .form-group.full { grid-column: 1/-1; }
  label { font-size: 12px; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase; color: var(--muted); }
  input, select, textarea {
    background: rgba(255,255,255,0.05); border: 1px solid var(--border);
    border-radius: var(--radius-sm); padding: 12px 16px;
    font-family: 'DM Sans', sans-serif; font-size: 14px; color: var(--white);
    transition: var(--transition); width: 100%; outline: none;
  }
  input:focus, select:focus, textarea:focus {
    border-color: var(--teal); background: rgba(14,165,160,0.05);
    box-shadow: 0 0 0 3px rgba(14,165,160,0.1);
  }
  input::placeholder, textarea::placeholder { color: var(--muted); }
  select option { background: var(--navy-mid); }

  /* ── Auth page ── */
  .auth-page {
    min-height: 100vh; 
    
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 40px 16px;

    overflow-y: auto; 
  }
  .auth-card {
    width: 100%;
    max-width: 420px;

    max-height: 90vh;   /* Prevent overflow */
    overflow-y: auto;   /* ENABLE SCROLL INSIDE */

    padding: 28px;
    border-radius: 20px;

    background: rgba(255,255,255,0.08);
    backdrop-filter: blur(20px);
  }

  .auth-page::-webkit-scrollbar {
    display: none;
  }

  .auth-page {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  /* Hide scrollbar but keep scroll */
  .auth-card::-webkit-scrollbar {
    display: none;
  }

  .auth-card {
    -ms-overflow-style: none;  /* IE & Edge */
    scrollbar-width: none;     /* Firefox */
  }

  .auth-logo {
    width: 56px; height: 56px; border-radius: 16px;
    background: linear-gradient(135deg, var(--teal), #0d7a77);
    display: flex; align-items: center; justify-content: center;
    font-size: 24px;
    box-shadow: 0 8px 24px rgba(14,165,160,0.3);
  }
  .auth-title {
    font-family: 'Instrument Serif', serif;
    font-size: 28px; letter-spacing: -0.5px; margin-bottom: 8px;
  }
  .auth-subtitle { font-size: 14px; color: var(--muted); margin-bottom: 32px; }
  .auth-tabs { display: flex; gap: 8px; margin-bottom: 24px; }
  .auth-tab {
    flex: 1; padding: 10px; border-radius: var(--radius-sm);
    font-size: 13px; font-weight: 500; cursor: pointer;
    border: 1px solid var(--border); background: none;
    color: var(--muted); transition: var(--transition);
  }
  .auth-tab.active { background: var(--teal-glow); border-color: rgba(14,165,160,0.3); color: var(--teal-bright); }
  .auth-switch { font-size: 13px; color: var(--muted); text-align: center; margin-top: 20px; }
  .auth-switch button { background: none; border: none; color: var(--teal-bright); cursor: pointer; font-weight: 500; text-decoration: underline; }

  /* ── Alert ── */
  .alert {
    padding: 12px 16px; border-radius: var(--radius-sm);
    font-size: 13px; margin-bottom: 16px;
    display: flex; align-items: flex-start; gap: 8px;
  }
  .alert-error { background: rgba(244,63,94,0.1); border: 1px solid rgba(244,63,94,0.2); color: #fda4af; }
  .alert-success { background: rgba(16,185,129,0.1); border: 1px solid rgba(16,185,129,0.2); color: #6ee7b7; }

  /* ── Modal ── */
  .modal-overlay {
    position: fixed; inset: 0; z-index: 200;
    background: rgba(0,0,0,0.7); backdrop-filter: blur(4px);
    display: flex; align-items: center; justify-content: center;
    padding: 20px; animation: fadeIn 0.2s ease;
  }
  .modal {
    background: var(--navy-mid); border: 1px solid var(--border);
    border-radius: 24px; padding: 36px; width: 100%; max-width: 540px;
    max-height: 85vh;
    margin-top : 130px; 
  }
  .modal-header { display: flex; justify-content: space-between; align-items: flex-start; magin-top: 12px; }
  .modal-title { font-family: 'Instrument Serif', serif; font-size: 24px; }
  .modal-close { background: none; border: none; color: var(--muted); cursor: pointer; font-size: 22px; line-height: 1; padding: 4px; }
  .modal-close:hover { color: var(--white); }
  .modal-footer { display: flex; gap: 12px; justify-content: flex-end; margin-top: 28px; }

  /* ── Doctor card ── */
  .doctors-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 16px; }
  .doctor-card {
    background: var(--card); border: 1px solid var(--border);
    border-radius: var(--radius); padding: 24px;
    transition: var(--transition); cursor: pointer;
  }
  .doctor-card:hover { transform: translateY(-3px); border-color: rgba(14,165,160,0.3); box-shadow: 0 12px 32px rgba(0,0,0,0.3); }
  .doctor-avatar {
    width: 52px; height: 52px; border-radius: 14px;
    background: linear-gradient(135deg, var(--teal), var(--gold));
    display: flex; align-items: center; justify-content: center;
    font-size: 20px; color: var(--navy); font-weight: 700;
    margin-bottom: 14px;
  }
  .doctor-name { font-weight: 600; font-size: 15px; margin-bottom: 4px; }
  .doctor-spec { font-size: 12px; color: var(--teal-bright); text-transform: uppercase; letter-spacing: 0.5px; }
  .doctor-email { font-size: 13px; color: var(--muted); margin-top: 8px; }

  /* ── Spinner ── */
  .spinner {
    width: 20px; height: 20px; border-radius: 50%;
    border: 2px solid rgba(255,255,255,0.2);
    border-top-color: var(--white);
    animation: spin 0.7s linear infinite;
  }

  /* ── Empty state ── */
  .empty {
    text-align: center; padding: 60px 20px;
    color: var(--muted); font-size: 14px;
  }
  .empty-icon { font-size: 48px; margin-bottom: 12px; opacity: 0.5; }
  .empty-title { font-size: 18px; font-weight: 600; color: var(--white); margin-bottom: 8px; }

  /* ── Misc ── */
  .flex { display: flex; }
  .items-center { align-items: center; }
  .justify-between { justify-content: space-between; }
  .gap-3 { gap: 12px; }
  .gap-2 { gap: 8px; }
  .mb-6 { margin-bottom: 24px; }
  .mb-4 { margin-bottom: 16px; }
  .text-muted { color: var(--muted); font-size: 13px; }

  @media (max-width: 768px) {
    .sidebar { display: none; }
    .main-panel { padding: 24px 16px; }
    .form-grid { grid-template-columns: 1fr; }
    .topbar { padding: 0 16px; }
    .stats-grid { grid-template-columns: 1fr 1fr; }
  }
`;