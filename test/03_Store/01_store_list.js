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
        await loadUrl(page, `${config.baseUrl}/store-list`)
        
        await shouldExist(page, '#search-store')
        await typeText(page, config.searchStore,'#search-store')
        
        const storeName = await getTextXpath(page, `//p[@class='store-name color-dark-grey']`)
        expect(storeName).to.equal(config.searchStore)
    })

    it.only('Should Redirect to Store Menu Page, When i choose Store', async() => {
        await loadUrl(page, `${config.baseUrl}/store-list`)
        
        await shouldExist(page, '#search-store')
        await typeText(page, config.searchStore,'#search-store')
        
        const storeName = await getTextXpath(page, `//p[@class='store-name color-dark-grey']`)
        expect(storeName).to.equal(config.searchStore)

        await shouldExist(page, '#store-select')
        await click(page, '#store-select')
        
        await shouldExist(page, '##espressobase')
        const url = await page.url()
        expect(url).to.contain(`${config.baseUrl}/order`)
    })

    it('Search Result Should Match with Search Input', async() => {
        await loadUrl(page, `${config.baseUrl}/store-list`)
        
        await shouldExist(page, '#search-store')
        await typeText(page, config.searchStore,'#search-store')
        
        const storeName = await getTextXpath(page, `//p[@class='store-name color-dark-grey']`)
        expect(storeName).to.equal(config.searchStore)
    })

    it('Search Result Should Match with Search Input', async() => {
        await loadUrl(page, `${config.baseUrl}/store-list`)
        
        await shouldExist(page, '#search-store')
        await typeText(page, config.searchStore,'#search-store')
        
        const storeName = await getTextXpath(page, `//p[@class='store-name color-dark-grey']`)
        expect(storeName).to.equal(config.searchStore)
    })
})
