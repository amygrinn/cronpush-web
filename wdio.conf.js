const { TimelineService } = require('wdio-timeline-reporter/timeline-service')

exports.config = {
  runner: 'local',
  specs: ['./tests/**/*.spec.js'],
  maxInstances: 10,
  capabilities: [
    {
      maxInstances: 5,
      browserName: 'chrome',
      acceptInsecureCerts: true,
      'goog:chromeOptions': {
        args: [
          '--disable-infobars',
          '--window-size=1280,800',
          '--headless',
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--log-level=1',
        ],
      },
    },
  ],
  logLevel: 'silent',
  bail: 0,
  baseUrl: 'http://localhost:8081',
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  services: [
    [
      'chromedriver',
      {
        args: ['--silent'],
      },
    ],
    [TimelineService],
  ],
  framework: 'mocha',
  reporters: [
    'spec',
    [
      'timeline',
      {
        outputDir: 'reports',
        fileName: 'test-report.html',
        screenshotStrategy: 'before:click',
      },
    ],
  ],
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000,
  },
}
