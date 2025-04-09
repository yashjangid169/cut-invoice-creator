
import React from 'react';

const PrintButton: React.FC = () => {
  const handlePrint = () => {
    window.print();
  };
  
  return (
    <div className="print-section no-print">
      <button className="print-btn" onClick={handlePrint}>Print / Save as PDF</button>
    </div>
  );
};

export default PrintButton;
