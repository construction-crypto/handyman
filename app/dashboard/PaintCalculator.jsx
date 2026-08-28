
"use client";

import { useState } from "react";

export default function PaintCalculator() {
  const [length, setLength] = useState(20);
  const [height, setHeight] = useState(9);
  const [result, setResult] = useState(null);

  const calculate = () => {
    const l = parseFloat(length) || 0;
    const h = parseFloat(height) || 0;
    const sqFt = l * h * 2;
    const gals = Math.ceil(sqFt / 350);
    setResult({ sqFt, gals });
  };

  return (
    <div style={{ background: "white", borderRadius: "8px", border: "1px solid #E2E8F0", padding: "32px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
      <h2 style={{ fontWeight: 700, textTransform: "uppercase", fontSize: "12px", letterSpacing: "0.1em", color: "#0F172A", marginBottom: "16px", paddingBottom: "12px", borderBottom: "1px solid #F1F5F9" }}>Paint Coverage & Gallon Calculator</h2>
      <p style={{ fontSize: "13px", color: "#64748B", marginBottom: "16px" }}>Estimate material requirements instantly based on standard 350 sq ft/gal coverage.</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px", fontSize: "12px" }}>
        <div>
          <label style={{ display: "block", fontWeight: 700, textTransform: "uppercase", color: "#334155", marginBottom: "8px" }}>Wall Length (ft)</label>
          <input 
            type="number" 
            value={length} 
            onChange={(e) => setLength(e.target.value)} 
            style={{ width: "100%", padding: "12px", backgroundColor: "#F8F9FA", border: "1px solid #CBD5E1", borderRadius: "4px", fontSize: "14px" }} 
          />
        </div>
        <div>
          <label style={{ display: "block", fontWeight: 700, textTransform: "uppercase", color: "#334155", marginBottom: "8px" }}>Wall Height (ft)</label>
          <input 
            type="number" 
            value={height} 
            onChange={(e) => setHeight(e.target.value)} 
            style={{ width: "100%", padding: "12px", backgroundColor: "#F8F9FA", border: "1px solid #CBD5E1", borderRadius: "4px", fontSize: "14px" }} 
          />
        </div>
      </div>
      <button 
        onClick={calculate}
        style={{ backgroundColor: "#0F172A", color: "white", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", padding: "12px 24px", border: "none", borderRadius: "4px", cursor: "pointer", letterSpacing: "0.05em" }}
      >
        Calculate Paint Needed
      </button>
      {result && (
        <div style={{ marginTop: "16px", padding: "16px", backgroundColor: "#F8F9FA", borderRadius: "4px", border: "1px solid #E2E8F0", fontSize: "13px", color: "#1E293B" }}>
          Estimated Surface Area: <strong>{result.sqFt} sq ft</strong>. Required Paint: <strong>{result.gals} gallon(s)</strong> (at 350 sq ft/gal).
        </div>
      )}
    </div>
  );
}

