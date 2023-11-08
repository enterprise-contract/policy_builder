//Component to export the final policy.yaml
import React from 'react';

const ExportButton = ({ onExport }) => {
  return (
    <button onClick={onExport}>
      Export policy.yaml
    </button>
  );
};

export default ExportButton;
