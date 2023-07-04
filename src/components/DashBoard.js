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
      <h5>(Please wait for few moment!! using free server so it may take some time to load the chart/graph)</h5>
      <BarGraph />
    </div>
  );
}
