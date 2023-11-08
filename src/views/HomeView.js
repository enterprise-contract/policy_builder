//The main view component that uses RuleList and PolicyEditor
import React from 'react';
import RuleList from '../components/RuleList';
import PolicyEditor from '../components/PolicyEditor';
import ExportButton from '../components/ExportButton';
import usePolicy from '../hooks/usePolicy';
import { downloadYaml } from '../utils/yamlUtils';

const HomeView = () => {
  const { rules, toggleRule, yamlContent } = usePolicy();

  const handleExport = () => {
    downloadYaml(yamlContent, 'policy.yaml');
  };

  return (
    <div>
      <h1> EC Policy Editor</h1>
      <RuleList rules={rules} onRuleToggle={toggleRule} />
      <PolicyEditor yamlContent={yamlContent} />
      <ExportButton onExport={handleExport} />
    </div>
  );
};

export default HomeView;