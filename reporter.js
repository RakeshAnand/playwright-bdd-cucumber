const reporter = require('cucumber-html-reporter');

const options = {
  theme: 'bootstrap',
  jsonFile: 'reports/cucumber-report.json',
  output: 'reports/report.html',
  reportSuiteAsScenarios: true,
  launchReport: true,
  screenshotsDirectory: 'reports/screenshots/',
  storeScreenshots: true
};

reporter.generate(options);
