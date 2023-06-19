import React, { useState } from "react";
import { Button, Dialog, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import axios from "axios";

const ToggleSwitch = () => {
  const [isChecked, setIsChecked] = useState(true);
  const [open, setOpen] = useState(false);

  const handleToggle = async () => {
    setIsChecked(!isChecked);
    handleCreatePopup(!isChecked);

    if (isChecked) {
      try {
        const response = await axios.post("/api/toggle", { checked: !isChecked });
        console.log(response.data); // Gestisci la risposta del backend come desideri
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleCreatePopup = (isChecked) => {
    setOpen(!isChecked);
  };

  const switchStyle = {
    position: "relative",
    display: "inline-block",
    width: "80px",
    height: "40px",
    borderRadius: "20px",
    backgroundColor: "#dddddd",
    overflow: "hidden",
    cursor: "pointer",
    top: "4px",
    left: "-30px",
  };

  const sliderStyle = {
    position: "absolute",
    top: "4px",
    left: "4px",
    width: "32px",
    height: "32px",
    borderRadius: "16px",
    backgroundColor: "#ffffff",
    boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.3)",
    transition: "transform 0.2s ease-in-out",
    transform: isChecked ? "translateX(44px)" : "translateX(0)",
  };

  const sliderBeforeStyle = {
    content: '""',
    position: "absolute",
    top: "4px",
    left: "4px",
    width: "32px",
    height: "32px",
    borderRadius: "16px",
    backgroundColor: "#52c41a",
    opacity: isChecked ? "1" : "0",
    transition: "opacity 0.2s ease-in-out",
  };

  return (
    <>
      <label className={`switch ${isChecked ? "checked" : ""}`}>
        <input type="checkbox" checked={isChecked} onChange={handleToggle} />
        <span style={switchStyle}>
          <span style={sliderStyle}></span>
          <span style={sliderBeforeStyle}></span>
        </span>
      </label>

      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>{isChecked ? "Modalità ATTIVO" : "Modalità SPENTO"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Sei attualmente nella modalità {isChecked ? "Attivo" : "Spento"}.
          </DialogContentText>
          <Button onClick={handleCloseDialog} variant="contained">
            Chiudi
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ToggleSwitch;
