const { Target, By, MatchLevel, StitchMode, FixedCutProvider } = require('@applitools/eyes-webdriverio');
//import { global } from '../pages/Global';

describe('Global', async () => {

    it('Native App', async () => {
        //await browser.saveScreenshot("./native.png")
        await eyes.check('Hello World', Target.window());
    });
});