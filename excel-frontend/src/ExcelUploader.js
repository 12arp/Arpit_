import React, { useState } from "react";

function ExcelUploader() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div style={{ padding: "50px", textAlign: "center", fontFamily: "Inter, sans-serif", backgroundColor: "#eef2f3", minHeight: "100vh" }}>
      <h2 style={{ color: "#1d3557", marginBottom: "30px", fontSize: "36px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "1px" }}>Developed by <span style={{ color: "#e63946" }}>Arpit Yadav</span></h2>
      
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", gap: "15px", marginBottom: "40px", padding: "30px", background: "white", boxShadow: "0px 6px 14px rgba(0,0,0,0.15)", borderRadius: "12px", width: "60%", margin: "auto" }}>
        <input 
          type="file" 
          onChange={handleFileChange} 
          style={{ padding: "14px", width: "100%", border: "2px solid #457b9d", borderRadius: "10px", backgroundColor: "white", fontSize: "18px", outline: "none" }}
        />
        <button 
          onClick={handleUpload} 
          style={{ 
            padding: "14px 28px", 
            backgroundColor: "#1d3557", 
            color: "white", 
            border: "none", 
            borderRadius: "10px", 
            cursor: "pointer", 
            fontSize: "20px", 
            fontWeight: "bold", 
            boxShadow: "0px 6px 10px rgba(0,0,0,0.25)",
            transition: "0.3s",
            width: "100%" 
          }}
        >
          Upload File
        </button>
      </div>

      {data && (
        <div style={{ marginTop: "30px" }}>
          <h3 style={{ marginBottom: "20px", fontSize: "24px", color: "#1d3557" }}>Total Candidates: {data.total_candidates}</h3>
          <table style={{ width: "90%", margin: "auto", borderCollapse: "collapse", boxShadow: "0 6px 14px rgba(0,0,0,0.15)", backgroundColor: "white", borderRadius: "12px", overflow: "hidden" }}>
            <thead>
              <tr style={{ backgroundColor: "#1d3557", color: "white", fontSize: "20px" }}>
                <th style={{ padding: "18px", border: "1px solid #ddd", textAlign: "left" }}>Column</th>
                <th style={{ padding: "18px", border: "1px solid #ddd", textAlign: "center" }}>Present</th>
                <th style={{ padding: "18px", border: "1px solid #ddd", textAlign: "left" }}>Absent IDs</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(data.columns).map(([column, info], index) => (
                <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "#f1faee" : "white", fontSize: "18px" }}>
                  <td style={{ padding: "18px", border: "1px solid #ddd", fontWeight: "bold", color: "#1d3557" }}>{column}</td>
                  <td style={{ padding: "18px", border: "1px solid #ddd", textAlign: "center", fontSize: "20px", color: "#457b9d" }}>{info.present}</td>
                  <td style={{ padding: "18px", border: "1px solid #ddd", color: "#e63946", fontWeight: "bold" }}>{info.absent.join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {/* Footer with Special Mention */}
      <div style={{
        marginTop: "50px", 
        padding: "25px 0", 
        background: "#1d3557", 
        color: "white", 
        fontSize: "20px", 
        fontWeight: "bold", 
        textAlign: "center", 
        boxShadow: "0 -2px 10px rgba(0,0,0,0.2)",
        borderRadius: "12px 12px 0 0",
        letterSpacing: "1px"
      }}>
        Specially developed for <span style={{ color: "#f4a261" }}>Mr. Shalendra Yadav</span>
      </div>
    </div>
  );
}

export default ExcelUploader;
