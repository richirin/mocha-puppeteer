const puppeteer = require('puppeteer')
const expect = require('chai').expect

const config = require('../../lib/config')
const { getAttributeHref, click, typeText, loadUrl, waitForText, pressKey, shouldExist, getTextXpath, getText} = require('../../lib/helpers')


describe('Store Detail', () => {
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

    it('Should Redirect to Store Images Page, When i click "Jelajahi Store"', async() => {
        // Open Store-detail page
        await loadUrl(page, `${config.baseUrl}/store-detail/64`)
        
        // Click Jelajahi Store
        await shouldExist(page, '#store-button-explore')
        await click(page, '#store-button-explore')

        // Verify Store Name
        const storeName = await getTextXpath(page, `//p[@class='navbar-page-title']`)
        expect(storeName).to.contain(config.searchStore)

        // Verify Url
        const url = await page.url()
        expect(url).to.contain(`${config.baseUrl}/store-images`)
    })

    it('Should Redirect to Menu Page, When i click Button "Pesan Dari Sini"', async() => {
        // Open Store-detail page
        await loadUrl(page, `${config.baseUrl}/store-detail/64`)
        
        // Click "Pesan dari sini"
        await page.focus('#store-button-select')
        await shouldExist(page, '#store-button-select')
        await click(page,'#store-button-select')
        
        // Verify Store Name
        const storeName = await getTextXpath(page, `//p[@class='address-label']`)
        expect(storeName).to.contain(config.searchStore)

        // Verify Url 
        const url = await page.url()
        expect(url).to.contain(`${config.baseUrl}/order`)
    })

    it('Should Redirect to Store List Page, when i click Back Button', async() => {
        // Open Store-detail page
        await loadUrl(page, `${config.baseUrl}/store-detail/64`)
        await page.focus('#nav-button-back')

        // Click Back Button
        await shouldExist(page, '#nav-button-back')
        await click(page, '#nav-button-back')
        
        // Verify Url
        await shouldExist(page, '#search-store')
        const url = await page.url()
        expect(url).to.contain(`${config.baseUrl}/store-list`)
    })

    it.skip('Verify if Phone Number contains 08', async() => {
        // Open Store-detail page
        await loadUrl(page, `${config.baseUrl}/store-detail/64`)
        
        // Verify Phone Number contain 08
        await shouldExist(page, '#store-button-select')
        const phoneNumber = await getAttributeHref(page, `//div[@class='contact-store-icon']//a`, 'href')
        expect(phoneNumber).to.contain('08')
    })
})
