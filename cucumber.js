require('dotenv').config();

module.exports = {
  default: {
    require: ["./steps/*.js","./support/hooks.js"],
    format: ['progress', 'json:reports/cucumber_report.json'],
    publishQuiet: true
  }
};
