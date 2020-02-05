const puppeteer = require('puppeteer')
const expect = require('chai').expect

const config = require('../../lib/config')
const {click, clearInput, clickXpath, typeText, loadUrl, shouldExist, getTextXpath } = require('../../lib/helpers')


describe('Home page ', () => {
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

    it('Should open Store List, When I click "Pilih Store"', async() => {
        await loadUrl(page, config.baseUrl)
        
        await shouldExist(page, '#home-select-store')
        await click(page, '#home-select-store')
        
        await shouldExist(page, '#search-store')
        
        const url = await page.url()
        expect(url).to.equal(`${config.baseUrl}/store-list`)
    })

    it('Should open Store List, When I click Pen Icon', async () => {
        await loadUrl(page, config.baseUrl)

        await shouldExist(page, '#home-button-edit')
        await click(page, '#home-button-edit')

        await shouldExist(page, '#search-store')
        
        const url = await page.url()
        expect(url).to.equal(`${config.baseUrl}/store-list`)
    })

    it('Should Redirect to Play Store, When i click image Get It On Google Play', async () => {
        await loadUrl(page, config.baseUrl)

        await shouldExist(page, '#home-button-edit')
        await clickXpath(page, `//img[@class='icon-google']`)

        const url = await page.url()
        expect(url).to.include('fore')
    })

    it('Should Redirect to Play Store, When i click image Download on the App Store', async () => {
        await loadUrl(page, config.baseUrl)

        await shouldExist(page, '#home-button-edit')
        await clickXpath(page, `//img[@class='icon-apple']`)

        const url = await page.url()
        expect(url).to.include('fore')
    })

    it('Show Pop Up Error(Oops), When i Click See Menu without Choose Store', async () => {
		const oops = 'OOPPSS...';
        // Open Homepage Fore
        await loadUrl(page, config.baseUrl)

        await shouldExist(page, '#home-button-menu')
        await click(page, '#home-button-menu')

        const verifyOops = await getTextXpath(page, `//div[@class='modal-container display-block']//div[@class='popup-title alert-type'][contains(text(),'OOPPSS...')]`)
        expect(verifyOops).to.equal(oops)
    });
})