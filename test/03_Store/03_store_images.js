const puppeteer = require('puppeteer')
const expect = require('chai').expect

const config = require('../../lib/config')
const { getAttribute, click, typeText, loadUrl, waitForText, pressKey, shouldExist, getTextXpath, getText} = require('../../lib/helpers')


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

    it('Should Redirect to Store detail Page, when i click Back Button', async() => {
        await loadUrl(page, `${config.baseUrl}/store-images/64`)
        
        await shouldExist(page, '#nav-button-back')
        await click(page, '#nav-button-back')

        const storeName = await getTextXpath(page, `//p[@class='store-name']`)
        expect(storeName).to.equal(config.searchStore)

        const url = await page.url()
        expect(url).to.contain(`${config.baseUrl}/store-detail`)
    })
})
