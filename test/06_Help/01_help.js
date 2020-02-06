const puppeteer = require('puppeteer')
const expect = require('chai').expect
const config = require('../../lib/config')
const {scrollDown ,clickXpath , login, click, typeText, loadUrl, waitForText, pressKey, shouldExist, getTextXpath, getText} = require('../../lib/helpers')


describe('Store List', () => {
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
        await login(page)
    })

    after(async function(){
        await browser.close()
    })

    it('redirect ke order-history page saat klik "Lihat Riwayat Pemesanan"', async() => {
        const pageHelp = 'Bantuan'
        const pageOrderHistory = 'Riwayat Pemesanan'
        // Open Store-list page
        await loadUrl(page, `${config.baseUrl}/help/3490879`)
        // Verify Element
        const navbarHelp = await getTextXpath(page, `//p[@class='navbar-page-title']`)
        expect(navbarHelp).to.equal(pageHelp)
        // Click Lihat Riwayat Pemesanan
        // await clickXpath(page, `//p[contains(text(),'Lihat Riwayat Pemesanan')]`)
        await click(page, '#help-history')
        // Verify Element
        const navbarOrderHistory = await getTextXpath(page, `//p[@class='navbar-page-title']`)
        expect(navbarOrderHistory).to.equal(pageOrderHistory)
        
        // Verify Url
        const url = await page.url()
        expect(url).to.contain(`${config.baseUrl}/order-history`)
    })

    it('redirect ke help-content page saat klik list Laporkan Masalah', async() => {
        const pageHelp = 'Bantuan'
        const pageHelpContent = 'Laporkan Masalah'
        // Open Store-list page
        await loadUrl(page, `${config.baseUrl}/help/3490879`)
        
        // Verify Element
        const navbarHelp = await getTextXpath(page, `//p[@class='navbar-page-title']`)
        expect(navbarHelp).to.equal(pageHelp)

        // Click Lihat Topik Masalah
        await clickXpath(page, '//div[3]//ul[1]//li[1]')

        // Verify Element
        const navbarHelpContent = await getTextXpath(page, `//p[@class='navbar-page-title']`)
        expect(navbarHelpContent).to.equal(pageHelpContent)

        // Verify Url
        const url = await page.url()
        expect(url).to.contain(`${config.baseUrl}/help-content`)
    })

    it('redirect ke other-topic page saat klik list other-page', async() => {
        const pageHelp = 'Bantuan'
        const pageHelpContent = 'Topik Lainnya'
        // Open Store-list page
        await loadUrl(page, `${config.baseUrl}/help/3490879`)

        // Verify Element
        const navbarHelp = await getTextXpath(page, `//p[@class='navbar-page-title']`)
        expect(navbarHelp).to.equal(pageHelp)

        // Scroll down
        await scrollDown(page)
        // Click Lihat Topik Lainnya
        await clickXpath(page, '//div[4]//ul[1]//li[1]')

        // Verify Element
        const navbarHelpContent = await getTextXpath(page, `//p[@class='navbar-page-title']`)
        expect(navbarHelpContent).to.equal(pageHelpContent)

        // Verify Url
        const url = await page.url()
        expect(url).to.contain(`${config.baseUrl}/other-topic`)
    })
})
