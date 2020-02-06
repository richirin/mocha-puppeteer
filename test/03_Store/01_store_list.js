const puppeteer = require('puppeteer')
const expect = require('chai').expect

const config = require('../../lib/config')
const { click, typeText, loadUrl, waitForText, pressKey, shouldExist, getTextXpath, getText} = require('../../lib/helpers')


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
    })

    after(async function(){
        await browser.close()
    })

    it('Search Result Should Match with Search Input', async() => {
        // Open Store-list page
        await loadUrl(page, `${config.baseUrl}/store-list`)
        // Input Search
        await shouldExist(page, '#search-store')
        await typeText(page, config.searchStore,'#search-store')
        // Verify Store Name match
        const storeName = await getTextXpath(page, `//p[@class='store-name color-dark-grey']`)
        expect(storeName).to.contain(config.searchStore)
    })

    it('Should Redirect to Store Menu Page, When i choose Store', async() => {
        // Open Store-list page
        await loadUrl(page, `${config.baseUrl}/store-list`)
        
        // Input Search
        await shouldExist(page, '#search-store')
        await typeText(page, config.searchStore,'#search-store')

        // Verify Search 
        const resultSearch = await getTextXpath(page, `//p[@class='store-name color-dark-grey']`)
        expect(resultSearch).to.contain(config.searchStore)

        // Click at Store
        await shouldExist(page, '#store-select')
        await click(page, '#store-select')
        
        // Verify Store Name
        const storeName = await getTextXpath(page, `//p[@class='address-label']`)
        expect(storeName).to.contain(config.searchStore)

        // Verify Url
        const url = await page.url()
        expect(url).to.contain(`${config.baseUrl}/order`)
    })

    it('Redirect to Store Detail Page, when i click Store Info', async() => {
        // Open Store-list page
        await loadUrl(page, `${config.baseUrl}/store-list`)
        
        // Input Search
        await shouldExist(page, '#search-store')
        await typeText(page, config.searchStore,'#search-store')
        
        // Verify Search 
        const storeName = await getTextXpath(page, `//p[@class='store-name color-dark-grey']`)
        expect(storeName).to.contain(config.searchStore)

        // Click Store Info
        await shouldExist(page, '#store-select')
        await click(page, '#store-detail')
        
        await shouldExist(page, '#store-button-select')
        
        // Verify Url
        const url = await page.url()
        expect(url).to.contain(`${config.baseUrl}/store-detail`)
    })

    it('Should redirect to Home page when i click back button', async() => {
        // Open Store-list page
        await loadUrl(page, `${config.baseUrl}/store-list`)
        
        // Click Back Button
        await shouldExist(page, '#search-store')
        await click(page, '#nav-button-back')
        

        // Verify element at Homepage
        await shouldExist(page, '#home-button-menu')

        // Verify Url
        const url = await page.url()
        expect(url).to.contain(`${config.baseUrl}/home`)
    })
})
