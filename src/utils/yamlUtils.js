import yaml from 'js-yaml';

export const generateYaml = (selectedRules) => {
  const sources = [{
    name: "Custom",
    policy: [
      "github.com/conforma/policy//policy/lib",
      "github.com/conforma/policy//policy/release"
    ],
    data: [], 
    config: {
      include: selectedRules.map(rule => rule.anchor), 
      exclude: [] 
    }
  }];

  //Structure for the YAML content.
  const yamlObj = {
    name:" Custom Policy",
    description:"This is A Custom Policy",
    publicKey:"k8s://openshift-pipelines/public-key",
    sources: sources
  };

  // Convert the JavaScript object into a YAML string
  return yaml.dump(yamlObj, { lineWidth: -1 });
};

export const downloadYaml = (yamlContent, filename = 'policy.yaml') => {
  const blob = new Blob([yamlContent], { type: 'text/yaml;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link); // Needed for firefox 
  link.click();
  document.body.removeChild(link);
};