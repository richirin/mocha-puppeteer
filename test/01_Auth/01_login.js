const puppeteer = require('puppeteer')
const expect = require('chai').expect

const config = require('../../lib/config')
const { getTextXpath, logout, click, clearInput, clickXpath, typeText, loadUrl, shouldExist } = require('../../lib/helpers')


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
    
    it('Successfully Login', async() => {
        // Open Homepage
        await loadUrl(page, config.baseUrl)
        
        // Click Menu bar/Burger Menu
        await shouldExist(page, '#home-button-menu')
        await click(page, '#menu-area')
        
        // Input Phone Number
        await shouldExist(page, '#input-daftar')
        await typeText(page, '0812345678', '#input-daftar')
        
        // Click Button Continue
        await shouldExist(page, '#menu-button-continue')
        await click(page, '#menu-button-continue')

        // Verify Url
        const urlOtp = await page.url()
        expect(urlOtp).to.contain('otp')

        // Input OTP
        await shouldExist(page, '#register-otp-code')
        await typeText(page, config.otp, '#register-otp-code')
        
        // Verify Url
        const urlAccountView = await page.url()
        expect(urlAccountView).to.contain(`${config.baseUrl}/register-otp`)
        await shouldExist(page, '#register-name-view')

        // Logout
        await logout(page)
    })

    it('Show Pop up error, when login without phone number', async () => {
        const oops = 'OOPPSS...';
        // Open Homepage 
        await loadUrl(page, config.baseUrl)
        
        // Click Menu Bar/Burger Menu
        await shouldExist(page, '#home-button-menu')
        await click(page, '#menu-area')
        
        // Click Button Continue
        await shouldExist(page, '#menu-button-continue')
        await click(page, '#menu-button-continue')

        // Verify Pop Up
        const verifyOops = await getTextXpath(page, `//div[@class='modal-container display-block']//div[@class='popup-title alert-type'][contains(text(),'OOPPSS...')]`)
        expect(verifyOops).to.contain(oops)
    })

    it('show Pop up Oops, when input wrong otp 3 times', async () => {
        const oops = 'OOPPSS...';
        // Open Homepage
        await loadUrl(page, config.baseUrl)
        
        // Click Menu bar/Burger Menu
        await shouldExist(page, '#home-button-menu')
        await click(page, '#menu-area')
        
        // Input Phone Number
        await shouldExist(page, '#input-daftar')
        await typeText(page, config.phoneNumber, '#input-daftar')
        
        // Click Button Continue
        await shouldExist(page, '#menu-button-continue')
        await click(page, '#menu-button-continue')

        // Input wrong otp 3 times
        await shouldExist(page, '#register-otp-code')
        await typeText(page, '12345', '#register-otp-code')
        await clearInput(page, '#register-otp-code')
        await typeText(page, '54321', '#register-otp-code')
        await clearInput(page, '#register-otp-code')
        await typeText(page, '12543', '#register-otp-code')

        // Verify Pop Up
        const verifyOops = await getTextXpath(page, `//div[@class='modal-container display-block']//div[@class='popup-title alert-type'][contains(text(),'OOPPSS...')]`)
        expect(verifyOops).to.contain(oops)
    })
})