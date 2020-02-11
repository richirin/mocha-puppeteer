const puppeteer = require('puppeteer')
const expect = require('chai').expect

const config = require('../../lib/config')
const { getTextXpath, logout, click, clearInput, clickXpath, typeText, loadUrl, shouldExist } = require('../../lib/helpers')
const { generateNumbers, generateEmail } = require('../../lib/utils')

describe('Login ', () => {
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
    
    it('Successfully Create New Account ', async() => {
        // Open Homepage
        await loadUrl(page, config.baseUrl)
        
        // Click Menu bar/Burger Menu
        await shouldExist(page, '#home-button-menu')
        await click(page, '#menu-area')
        
        // Input Phone Number
        await shouldExist(page, '#input-daftar')
        await typeText(page, '+628' + generateNumbers(), '#input-daftar')
        
        // Click Button Continue
        await shouldExist(page, '#menu-button-continue')
        await click(page, '#menu-button-continue')

        // Verify Url
        const urlOtp = await page.url()
        expect(urlOtp).to.contain('otp')

        // Input OTP
        await shouldExist(page, '#register-otp-code')
        await typeText(page, config.otp, '#register-otp-code')
        
        // Input name
        await shouldExist(page, '#register-name')
        await typeText(page, config.userFore ,'#register-name')

        // Input Email
        await shouldExist(page, '#register-email')
        await typeText(page, generateEmail(),'#register-email')

        await shouldExist(page, '#register-button-submit')
        await click(page, '#register-button-submit')

        // Verify Url
        await shouldExist(page, '#register-name-view')
        const urlAccountView = await page.url()
        expect(urlAccountView).to.contain(`${config.baseUrl}/account-view`)
        
    })
})