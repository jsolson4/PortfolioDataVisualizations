import React, { useState } from 'react';
import ReactSlider from 'react-slider';
import './RangeSlider.css';

const RangeSlider = ({ min, max, step, onRangeChange }) => {
  const [range, setRange] = useState([min, max]);

  const handleSliderChange = (newRange) => {
    setRange(newRange);
    onRangeChange(newRange);
  };

  return (
    <div className="range-slider-container">
      <ReactSlider
        className="horizontal-slider"
        thumbClassName="example-thumb"
        trackClassName="example-track"
        min={min}
        max={max}
        step={step}
        value={range}
        onChange={handleSliderChange}
        renderTrack={(props, state) => {
          let trackClassName;
          if (state.index === 0) {
            trackClassName = 'example-track example-track-0';
          } else if (state.index === 1) {
            trackClassName = 'example-track example-track-1';
          } else {
            trackClassName = 'example-track';
          }
          return <div {...props} className={trackClassName} />;
        }}
      />
      <div className="range-values">
        <span>Min: {range[0]}</span>
        <span>Max: {range[1]}</span>
      </div>
    </div>
  );
};

export default RangeSlider;
