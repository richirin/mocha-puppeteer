const puppeteer = require('puppeteer')
const expect = require('chai').expect

const config = require('../../lib/config')
const { logout, click, clearInput, clickXpath, typeText, loadUrl, shouldExist } = require('../../lib/helpers')


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
        await loadUrl(page, config.baseUrl)
        
        await shouldExist(page, '#home-button-menu')
        await click(page, '#menu-area')
        
        await shouldExist(page, '#input-daftar')
        await typeText(page, config.phoneNumber, '#input-daftar')
        
        await shouldExist(page, '#menu-button-continue')
        await click(page, '#menu-button-continue')

        const urlOtp = await page.url()
        expect(urlOtp).to.contain('otp')

        await shouldExist(page, '#register-otp-code')
        await typeText(page, config.otp, '#register-otp-code')
        
        const urlAccountView = await page.url()
        expect(urlAccountView).to.contain('otp')
        await shouldExist(page, '#register-name-view')

        await logout(page)
    })

    it('Show Pop up error, when login without phone number', async () => {
        await loadUrl(page, config.baseUrl)
        
        await shouldExist(page, '#home-button-menu')
        await click(page, '#menu-area')
        
        await shouldExist(page, '#input-daftar')

        await shouldExist(page, '#menu-button-continue')
        await click(page, '#menu-button-continue')

        await clickXpath(page, `//div[@class='modal-container display-block']//button[@id='modal-notif-okay']`)
    })

    it('show Pop up OOps, when input wrong otp 3 times', async () => {
        await loadUrl(page, config.baseUrl)
        
        await shouldExist(page, '#home-button-menu')
        await click(page, '#menu-area')
        
        await shouldExist(page, '#input-daftar')
        await typeText(page, config.phoneNumber, '#input-daftar')
        
        await shouldExist(page, '#menu-button-continue')
        await click(page, '#menu-button-continue')

        const urlOtp = await page.url()
        expect(urlOtp).to.contain('otp')

        await shouldExist(page, '#register-otp-code')
        await typeText(page, '12345', '#register-otp-code')
        await clearInput(page, '#register-otp-code')
        await typeText(page, '54321', '#register-otp-code')
        await clearInput(page, '#register-otp-code')
        await typeText(page, '12543', '#register-otp-code')

        await clickXpath(page, `//div[@class='modal-container display-block']//button[@id='modal-notif-okay']`)

        await shouldExist(page, '#home-button-menu')
    })
})