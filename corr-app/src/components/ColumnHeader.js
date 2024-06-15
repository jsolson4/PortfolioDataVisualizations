import React from 'react';
import './ColumnHeader.css';

const ColumnHeader = ({ title }) => {
  return (
    <div className="column-header">
      <h2>{title}</h2>
    </div>
  );
};

export default ColumnHeader;