
import Database from "better-sqlite3";
import path from "path";
import PaintCalculator from "./PaintCalculator";

export default async function DashboardPage({ searchParams }) {
  const params = await searchParams;
  const token = params?.token;

  if (!token) {
    return (
      <div style={{ fontFamily: "Inter, sans-serif", background: "#F8F9FA", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
        <div style={{ background: "white", padding: "40px", borderRadius: "12px", boxShadow: "0 4px 10px rgba(0,0,0,0.05)", maxWidth: "500px", width: "100%", textAlign: "center", border: "1px solid #E2E8F0" }}>
          <h2 style={{ color: "#0F172A", fontSize: "20px", fontWeight: "bold", marginBottom: "12px" }}>Secure Access Required</h2>
          <p style={{ color: "#4A5568", fontSize: "14px", lineHeight: "1.5" }}>No valid client security token was provided. Please use the secure link sent via your project portal email.</p>
        </div>
      </div>
    );
  }

  let project = null;
  try {
    const dbPath = path.join(process.cwd(), "api", "database.sqlite");
    const db = new Database(dbPath, { readonly: true });
    const stmt = db.prepare("SELECT * FROM projects WHERE client_token = ?");
    project = stmt.get(token);
  } catch (err) {
    console.error("Database query failed:", err);
  }

  if (!project) {
    return (
      <div style={{ fontFamily: "Inter, sans-serif", background: "#F8F9FA", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
        <div style={{ background: "white", padding: "40px", borderRadius: "12px", boxShadow: "0 4px 10px rgba(0,0,0,0.05)", maxWidth: "500px", width: "100%", textAlign: "center", border: "1px solid #E2E8F0" }}>
          <h2 style={{ color: "#E53E3E", fontSize: "20px", fontWeight: "bold", marginBottom: "12px" }}>Project Not Found</h2>
          <p style={{ color: "#4A5568", fontSize: "14px", lineHeight: "1.5" }}>The security token provided is invalid or has expired.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "Inter, sans-serif", backgroundColor: "#F8F9FA", color: "#1A1A1A", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      
      <header style={{ background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)", color: "white", borderBottom: "2px solid #C5A059", position: "sticky", top: 0, zIndex: 50, boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 32px", height: "80px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ height: "14px", width: "14px", backgroundColor: "#C5A059" }}></div>
            <div>
              <span style={{ fontSize: "14px", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "white", display: "block" }}>Handyman Painting L.L.C.</span>
              <span style={{ fontSize: "10px", letterSpacing: "0.05em", textTransform: "uppercase", color: "#C5A059", fontWeight: 600 }}>Customer Project Center</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "24px", fontSize: "12px", fontWeight: 600 }}>
            <span style={{ color: "#CBD5E1" }}>Secure Portal View</span>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: "1280px", margin: "0 auto", padding: "40px 32px", flexGrow: 1, width: "100%", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "32px" }}>
        
        <div style={{ gridColumn: "span 2", display: "flex", flexDirection: "column", gap: "32px" }}>
          
          <div style={{ background: "white", borderRadius: "8px", border: "1px solid #E2E8F0", padding: "32px", position: "relative", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <div style={{ position: "absolute", top: 0, left: 0, width: "6px", height: "100%", backgroundColor: "#C5A059" }}></div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", paddingBottom: "24px", borderBottom: "1px solid #F1F5F9" }}>
              <div>
                <span style={{ fontSize: "10px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.1em", color: "#C5A059", backgroundColor: "rgba(197, 160, 89, 0.1)", padding: "6px 10px", borderRadius: "4px" }}>Active Project Overview</span>
                <h1 style={{ fontSize: "24px", fontWeight: 800, color: "#0F172A", marginTop: "12px" }}>Project ID: {project.id}</h1>
              </div>
              <div style={{ textAlign: "right" }}>
                <span style={{ fontSize: "11px", color: "#64748B", display: "block", fontWeight: 500, textTransform: "uppercase" }}>Cure Status</span>
                <span style={{ fontSize: "13px", fontWeight: 700, color: "#059669" }}>{project.cure_status}</span>
              </div>
            </div>

            <div style={{ marginTop: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", fontSize: "13px" }}>
                <span style={{ fontWeight: 700, color: "#1E293B" }}>Current Phase: {project.current_phase}</span>
                <span style={{ fontWeight: 700, color: "#2563EB" }}>{project.progress}% Complete</span>
              </div>
              <div style={{ backgroundColor: "#F1F5F9", borderRadius: "8px", height: "16px", overflow: "hidden" }}>
                <div style={{ backgroundColor: "#2563EB", width: `${project.progress}%`, height: "100%", transition: "width 0.5s ease-in-out" }}></div>
              </div>
            </div>

            <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: "1px solid #F1F5F9", fontSize: "12px", color: "#64748B", display: "flex", justifyContent: "space-between" }}>
              <span>Initialized Timestamp: {new Date(project.created_at).toLocaleString()}</span>
              <span style={{ fontWeight: 600, color: "#0F172A" }}>You Betcha, Quality Guaranteed</span>
            </div>
          </div>

          <PaintCalculator />

          <div style={{ background: "white", borderRadius: "8px", border: "1px solid #E2E8F0", padding: "32px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <h2 style={{ fontWeight: 700, textTransform: "uppercase", fontSize: "12px", letterSpacing: "0.1em", color: "#0F172A", marginBottom: "16px", paddingBottom: "12px", borderBottom: "1px solid #F1F5F9" }}>Handyman's Prairie Painting Wisdom</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", fontSize: "13px", color: "#475569" }}>
              <div style={{ padding: "16px", backgroundColor: "#F8F9FA", borderRadius: "6px", border: "1px solid #E2E8F0" }}>
                <strong style={{ color: "#0F172A", display: "block", marginBottom: "6px" }}>The Morning Dew Rule</strong>
                Never roll exterior paint before 9:00 AM if there is heavy morning dew. Trapped moisture causes blistering faster than anything else.
              </div>
              <div style={{ padding: "16px", backgroundColor: "#F8F9FA", borderRadius: "6px", border: "1px solid #E2E8F0" }}>
                <strong style={{ color: "#0F172A", display: "block", marginBottom: "6px" }}>Wind & Sun Management</strong>
                Painting in direct 90° prairie wind dries the top layer too fast, leaving the bond underneath weak. We paint with the shade.
              </div>
            </div>
          </div>

        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          <div style={{ background: "#0F172A", color: "white", borderRadius: "8px", padding: "32px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)", borderTop: "2px solid #C5A059" }}>
            <h3 style={{ fontWeight: 700, textTransform: "uppercase", fontSize: "12px", letterSpacing: "0.1em", color: "#C5A059", marginBottom: "12px" }}>Talk to Your Crew Lead</h3>
            <p style={{ fontSize: "13px", color: "#CBD5E1", marginBottom: "24px", lineHeight: "1.6" }}>Have a question about your current phase or need to coordinate access? Reach out directly.</p>
            <a href="tel:3203219359" style={{ display: "block", textAlign: "center", backgroundColor: "#C5A059", color: "#0F172A", fontSize: "12px", fontWeight: 800, textTransform: "uppercase", padding: "14px", borderRadius: "4px", textDecoration: "none", letterSpacing: "0.05em" }}>Call 320-321-9359</a>
          </div>
        </div>

      </main>

      <footer style={{ background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)", color: "#94A3B8", padding: "24px 32px", textAlign: "center", fontSize: "12px", borderTop: "1px solid #1E293B" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>&copy; 2026 Handyman Painting L.L.C. All Rights Reserved.</span>
          <span style={{ fontSize: "10px", color: "#C5A059", fontFamily: "monospace", letterSpacing: "0.1em" }}>SECURE CLIENT PORTAL</span>
        </div>
      </footer>

    </div>
  );
}

