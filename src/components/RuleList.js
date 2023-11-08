import './CSS/RuleList.css';

const RuleList = ({ rules, onRuleToggle }) => {

    const filteredRules = rules.filter(rule => {
    const title = rule.title;
    return title;
  });

  // Group the rules by package title and description.
  const groupedRules = filteredRules.reduce((acc, rule) => {
    const packageTitle = rule.packageInfo?.title || "Unknown Package";
    const packageDescription = rule.packageInfo?.description || "No description available.";
    if (!acc[packageTitle]) {
      acc[packageTitle] = { description: packageDescription, rules: [] };
    }
    acc[packageTitle].rules.push(rule);
    return acc;
  }, {});

  return (
    <div className="rule-list">
      {Object.entries(groupedRules).map(([packageTitle, packageData]) => (
        <section key={packageTitle} className="package-section">
          <strong className="package-title">{packageTitle}</strong>
          <p className="package-description">{packageData.description}</p>
          {packageData.rules.map(rule => (
            <div key={rule.anchor} className="rule">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={rule.isSelected}
                  onChange={() => onRuleToggle(rule)}
                  className="checkbox"
                />
                <span className="rule-title">{rule.title}</span>
              </label>
              <p className="rule-description">Description: {rule.description}</p>
              <p className="rule-code">Code: {rule.anchor}</p>
            </div>
          ))}
        </section>
      ))}
    </div>
  );
};

export default RuleList;
