const puppeteer = require('puppeteer')
const expect = require('chai').expect

const config = require('../../lib/config')
const { click, typeText, loadUrl, waitForText, pressKey, shouldExist } = require('../../lib/helpers')


describe('My first puppeteer test', () => {
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
        await click(page, '#asdmenu-area')
        
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
    })

    it('Show Pop up error, when login without phone number', async () => {
        await page.reload()
        await shouldExist(page, '#page-content')

        await waitForText(page, 'body', 'WRITE A POST')

        const url = await page.url()
        const title = await page.title()

        expect(url).to.contain('dev')
        expect(title).to.contains('Community')
    })

    it.skip('click method', async () => {
        await loadUrl(page, config.baseUrl)
        await click(page, '#write-link')
        await shouldExist(page, '.registration-rainbow')
    })

    it.skip('submit searchbox', async () => {
        await loadUrl(page, config.baseUrl)
        await typeText(page, 'Javascript', '#nav-search')
        await pressKey(page, 'Enter')
        await shouldExist(page, '#articles-list')
    })
})