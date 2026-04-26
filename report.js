const reporter = require('cucumber-html-reporter');
const fs = require('fs');

const results = JSON.parse(fs.readFileSync('reports/cucumber_report.json', 'utf-8'));

// Count passed/failed steps
let passed = 0, failed = 0;
results.forEach(feature => {
  feature.elements.forEach(scenario => {
    scenario.steps.forEach(step => {
      if (step.result.status === 'passed') passed++;
      else if (step.result.status === 'failed') failed++;
    });
  });
});

const total = passed + failed;
const passPercent = ((passed / total) * 100).toFixed(2);
const failPercent = ((failed / total) * 100).toFixed(2);

const options = {
  theme: 'bootstrap',
  jsonFile: 'reports/cucumber_report.json',
  output: 'reports/cucumber_report.html',
  reportSuiteAsScenarios: true,
  launchReport: true,
  metadata: {
    "App Version": "1.0.0",
    "Test Environment": "STAGING",
    "Browser": "Chromium",
    "Platform": "Windows 10",
    "Executed": new Date().toLocaleString(),
    "Pass %": `${passPercent}%`,
    "Fail %": `${failPercent}%`
  }
};

reporter.generate(options);
