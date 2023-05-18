import React from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import "./styles.css";

function SliderComponent(props) {
  return (
    <div style={{ "--rangeColor": props?.rangeColor }}>
      <RangeSlider id="range-slider-bt" {...props} />
    </div>
  );
}

export default SliderComponent;
