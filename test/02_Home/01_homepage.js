const func = require('../../helpers/function.js')
const assert = require('assert')
const puppeteer = require('puppeteer')

let browser
let page

  describe('logout', () => {
    before(async () => {
        browser = await puppeteer.launch({
          headless: false,
          slowMo: 100
        })
        page = await browser.newPage()
        await func.login(page);
      })
    after(async () => {
        await browser.close()
      })
      it('Successfully Logout', async () => {
        await page.waitForSelector('#menu-area', {visible : true})
        await page.click('#menu-area')

        await page.waitForSelector('.button-exit')
        await page.click('.button-exit')
      }).timeout(100000)
    })