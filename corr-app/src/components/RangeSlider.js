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
    <div className="range-slider">
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
            return (
              <div
                {...props}
                className={
                    state.index === 0 ? 'example-track example-track-0' : 'example-track example-track-1'
                }
              />
            );
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
