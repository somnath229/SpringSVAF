import React from "react";
import BarGraph from "./BarGraph";
  
export default function DashBoard() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        margin:"1rem",
      }}>
      <h1>Data Visualization Dashboard</h1>
      <BarGraph />
    </div>
  );
}
