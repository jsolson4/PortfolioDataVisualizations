import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import 'd3-force-boundary';
import './ticker_styles.css';
import * as fx from './components/functions';
import * as ux from './components/user_actions';
import TimeSelector from './components/TimeSelector';
import RangeSlider from './components/RangeSlider';
import { initializeGraph } from './components/graph';

const CorrelationExplorer = () => {

  // add time range selector
  const [timeRange, setTimeRange] = useState('3');
  const handleTimeSelect = (range) => {
    console.log('Selected time range: ${range} months')
    setTimeRange(range);
  }

  // correlation value filter
  const [range, setRange] = useState([-1, 1]);
  const handleRangeChange = (newRange) => {
    console.log(`Selected range: ${newRange[0]} - ${newRange[1]} months`);
    setRange(newRange);
  };
  
  // Handle the selected range (e.g., update a chart or fetch data)
  const [correlation, setCorrelation] = useState(0.0);

  useEffect(() => {
    initializeGraph("#graph-container", {
      links: '/data/ticker_corr3.csv',
      nodes: '/data/ticker_nodes3.csv'
    });
  }, []);

  return (
    <div>
      <div className="left-column">
        <div className="left-column-content">
          <h2>Correlation Explorer</h2>
          
          <TimeSelector onSelectTimeRange={handleTimeSelect} />
          <div>
          <RangeSlider min={-1} max={1} step={0.01}
            onRangeChange={handleRangeChange}/>
</div>
          {/* <div className="slidecontainer">
            <input type="range" min="0" max="1" value={correlation} step="0.01" className="slider" id="corrRange" 
              onChange={(e) => setCorrelation(e.target.value)} />
            <p>Min. Correlation: <span id="corrMinValue">{correlation}</span></p>
          </div> */}
        </div>
      </div>
      <div className="right-column">
        <h2 id="my-heading" style={{ textAlign: 'center' }}>Original heading text</h2>
        <svg id="graph-container" width="1100" height="800"></svg>
        <div className="tooltip" id="tooltip"></div>
      </div>
    </div>
  );
};

export default CorrelationExplorer;
