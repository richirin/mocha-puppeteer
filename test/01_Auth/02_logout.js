const puppeteer = require('puppeteer')
const expect = require('chai').expect

const config = require('../../lib/config')
const { login, click, typeText, loadUrl, waitForText, pressKey, shouldExist } = require('../../lib/helpers')


describe('Logout', () => {
    let browser
    let page

    before(async function() {
        browser = await puppeteer.launch({
            headless : config.isHeadless,
            slowMo : config.slowMo,
            devtools : config.isDevtools,
            timeout : config.timeout,
        })
        page = await browser.newPage()
        await page.setDefaultTimeout(config.timeout)
        await page.setViewport({
            width : config.viewportWidth,
            height : config.viewportHeight,
        })
    })

    after(async function(){
        await browser.close()
    })

    it.skip('Successfully Logout', async() => {
        // Login
        await login(page)
        // Click Menu Bar/Burger Menu
        await shouldExist(page, '#menu-area')
        await click(page, '#menu-area')
        
        // Click "Keluar" 
        await shouldExist(page, '.button-exit')
        await click(page, '.button-exit')
        
        await shouldExist(page, '#home-button-menu')

        // Click Menu Area
        await shouldExist(page, '#menu-area')
        await click(page, '#menu-area')

        // Verify User was logout
        await shouldExist(page, '#input-daftar')
    })
})