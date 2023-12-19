//Component to edit and preview the policy.yaml
import React from 'react';

const PolicyEditor = ({ yamlContent }) => {
  return (
    <textarea
      value={yamlContent}
      readOnly
      rows={20}
      style={{ width: '100%' }}
    />
  );
};

export default PolicyEditor;
