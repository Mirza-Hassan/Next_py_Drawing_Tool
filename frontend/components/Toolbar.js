import React from "react";

const Toolbar = ({ setDrawType }) => {
  return (
    <div style={toolbarStyle}>
      <button style={buttonStyle} onClick={() => setDrawType("Circle")}>
        Circle
      </button>
      <button style={buttonStyle} onClick={() => setDrawType("Rectangle")}>
        Rectangle
      </button>
      <button style={buttonStyle} onClick={() => setDrawType("Star")}>
        Star
      </button>
    </div>
  );
};

const toolbarStyle = {
  position: "absolute",
  top: "10px",
  right: "10px",
  background: "white",
  padding: "15px",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  zIndex: 1000,
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const buttonStyle = {
  padding: "10px 20px",
  border: "none",
  borderRadius: "5px",
  background: "#007BFF",
  color: "white",
  cursor: "pointer",
  fontSize: "16px",
};

export default Toolbar;