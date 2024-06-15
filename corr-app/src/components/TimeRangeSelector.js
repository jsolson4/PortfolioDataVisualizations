import React, { useState } from 'react';

const TimeRangeSelector = ({ onSelectTimeRange }) => {
  const [selectedRange, setSelectedRange] = useState('3');

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelectedRange(value);
    onSelectTimeRange(value);
  };

  return (
    <div style={styles.container}>
      <label htmlFor="timeRange" style={styles.label}>Select Time Range:</label>
      <select
        id="timeRange"
        value={selectedRange}
        onChange={handleSelectChange}
        style={styles.select}
      >
        <option value="3">3 Months</option>
        <option value="6">6 Months</option>
        <option value="9">9 Months</option>
        <option value="12">12 Months</option>
        <option value="crisis">Crisis Correlation</option>
      </select>
    </div>
  );
};

const styles = {
  container: {
    margin: '20px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: '#f9f9f9',
  },
  label: {
    marginRight: '10px',
  },
  select: {
    padding: '5px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
};

export default TimeRangeSelector;
