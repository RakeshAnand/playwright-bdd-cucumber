const reporter = require('cucumber-html-reporter');

const options = {
  theme: 'bootstrap',
  jsonFile: 'reports/cucumber_report.json',   // must match the JSON output path
  output: 'reports/cucumber_report.html',
  reportSuiteAsScenarios: true,
  launchReport: true, // opens automatically in your default browser
  metadata: {
    "App Version": "1.0.0",
    "Test Environment": "STAGING",
    "Browser": "Chromium",
    "Platform": "Windows 10"
  }
};

reporter.generate(options);
