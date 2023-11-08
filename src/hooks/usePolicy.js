import { useState, useEffect } from 'react';
import jsonData from '../data/data.json';
import { generateYaml } from '../utils/yamlUtils';

const usePolicy = () => {
  const [rules, setRules] = useState([]);

  useEffect(() => {
    const process = (annotations) => {
      return Object.entries(annotations).flatMap(([key, value]) => {
        // Check if the value is indeed an array before processing
        if (Array.isArray(value)) {
          return value.map(rule => ({
            ...rule,
            isSelected: false, // initial state for selection
          }));
        }
        // If it's not an array, return an empty array to continue flatMapping without errors
        return [];
      });
    };
    // Process all data within jsonData
    const allRules = Object.entries(jsonData).flatMap(([key, value]) => {
      // We only want to process objects that represent annotation categories
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        return process(value);
      }
      // Skip non-object properties
      return [];
    });

    setRules(allRules);
  }, []);
  
  const toggleRule = (ruleToToggle) => {
    setRules(currentRules =>
      currentRules.map(rule =>
        rule.anchor === ruleToToggle.anchor
          ? { ...rule, isSelected: !rule.isSelected } // Toggle only this rule
          : rule // Leave other rules unchanged
      )
    );
  };

  const yamlContent = generateYaml(rules.filter(rule => rule.isSelected));
  return {
    rules,
    toggleRule,
    yamlContent
  };
};
export default usePolicy;
