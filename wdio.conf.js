const {
    Eyes,
    BatchInfo,
    ConsoleLogHandler,
    FileLogHandler,
    MatchLevel,
    StitchMode,
    Configuration,
    ClassicRunner,
	VisualGridRunner,
	BrowserType,
	DeviceName,
	ScreenOrientation
} = require('@applitools/eyes-webdriverio');

const { TimelineService } = require('wdio-timeline-reporter/timeline-service');
let batchId = String;

const runner = new ClassicRunner();
let /** @type {Eyes} */ eyes;

exports.config = {
	runner: 'local',
	hostname: 'applitools.perfectomobile.com',
	port: 80,
	path: '/nexperience/perfectomobile/wd/hub',
	specs: ['./tests/native.js'],

	capabilities: [
		{
			/** 
			platformName: 'Android',
			platformVersion: '11',
			location: 'NA-US-BOS',
			resolution: '1080x2400',
			manufacturer: 'OnePlus',
			model: 'Nord N10 5G',
			*/
			deviceName: "2C6290161F037ECE",
			app: 'PRIVATE:eyes-hello-world.apk',
			securityToken: "eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJhNjhjODZkYi0xMjNiLTQxZDEtOTMxMC1lZjM2NDJmNGEyMGEifQ.eyJpYXQiOjE2MzU0OTY4ODEsImp0aSI6Ijk3N2FjZGQxLWU2YmItNDlkOS05ZWFiLWI0MDM3Yzg0MTdlOCIsImlzcyI6Imh0dHBzOi8vYXV0aDQucGVyZmVjdG9tb2JpbGUuY29tL2F1dGgvcmVhbG1zL2FwcGxpdG9vbHMtcGVyZmVjdG9tb2JpbGUtY29tIiwiYXVkIjoiaHR0cHM6Ly9hdXRoNC5wZXJmZWN0b21vYmlsZS5jb20vYXV0aC9yZWFsbXMvYXBwbGl0b29scy1wZXJmZWN0b21vYmlsZS1jb20iLCJzdWIiOiI3YzBhNjlmNi05ZDk2LTQzMjctODlhZC00NDMyMDY4ZjUxYTMiLCJ0eXAiOiJPZmZsaW5lIiwiYXpwIjoib2ZmbGluZS10b2tlbi1nZW5lcmF0b3IiLCJub25jZSI6IjBjZWYyYzM2LTA5OGMtNDgxYS05ZmY5LTA3OGZlMWM2NTg1YSIsInNlc3Npb25fc3RhdGUiOiIwNjllZTEwYi0zOWQ3LTQwMWMtODI0Mi1jMjYwNWMyNTE5YWUiLCJzY29wZSI6Im9wZW5pZCBlbWFpbCBvZmZsaW5lX2FjY2VzcyBwcm9maWxlIn0.fepomONnyadqdzcOQrOU4OS_PPLtM-rYDLWzQpgx4W4"
		}
	],

	logLevel: 'trace',
	outputDir: './test-report/output',
	bail: 0,
	baseUrl: '',
	waitforTimeout: 10000,
	connectionRetryTimeout: 90000,
	connectionRetryCount: 3,
	framework: 'mocha',
	reporters: [
		'dot',
		'spec',
		[
			'allure',
			{
				outputDir: './test-report/allure-result/',
				disableWebdriverStepsReporting: false,
				disableWebdriverScreenshotsReporting: false,
			},
		],
		['timeline', { outputDir: './test-report/timeline' }],
	],
	mochaOpts: {
		ui: 'bdd',
		compilers: ['js:@babel/register'],
		timeout: 1200000000,
		bail: 0
	},
	
	sync: false,

	services: [
		[TimelineService]
	],


	beforeSession() {
		global.batchId = Math.round((new Date()).getTime() / 1000).toString();
		console.log("Before... session");
	},

	beforeTest: async function (test, context) {
		console.log("before test...");
		const eyez = new Eyes(runner)
		eyez.setApiKey(process.env.APPLITOOLS_API_KEY);
		eyez.setBatch({
            id: global.batchId,
            name: 'WDIO5',
            sequenceName: 'WDIO5',
            notifyOnCompletion: true
        });
		console.log("Eyes is open:", eyez.getIsOpen());
		await eyez.open(browser, "Global Eyes", test.title);
		console.log("Eyes is open:", eyez.getIsOpen());
		global.eyes = eyez;
	},

	afterTest: async function (test, context, { error, result, duration, passed, retries }) {
		try {
            await global.eyes.close(false)
        } finally {
            await global.eyes.abort();
        }
	},

	afterSession: async function (config, capabilities, specs) {
		let results = await runner.getAllTestResults(false);
		console.log(results);
    },
};