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
        // Open Home page
        await loadUrl(page, config.baseUrl)
        
        // CLick Choose Store
        await shouldExist(page, '#home-select-store')
        await click(page, '#home-select-store')
        
        await shouldExist(page, '#search-store')
        
        // Verify Url
        const url = await page.url()
        expect(url).to.contain(`${config.baseUrl}/store-list`)
    })

    it('Should open Store List, When I click Pen Icon', async () => {
        // Open Home page
        await loadUrl(page, config.baseUrl)

        // Click Pen Icon
        await shouldExist(page, '#home-button-edit')
        await click(page, '#home-button-edit')

        await shouldExist(page, '#search-store')
        
        // Verify Url
        const url = await page.url()
        expect(url).to.contain(`${config.baseUrl}/store-list`)
    })

    it('Should Redirect to Play Store, When i click image Get It On Google Play', async () => {
        // Open Home page
        await loadUrl(page, config.baseUrl)

        // Click image get it on playstore
        await shouldExist(page, '#home-button-edit')
        await clickXpath(page, `//img[@class='icon-google']`)

        // Verify Url
        const url = await page.url()
        expect(url).to.include('fore')
    })

    it('Should Redirect to App Store, When i click image Download on the App Store', async () => {
        // Open Home page
        await loadUrl(page, config.baseUrl)

        // Click image Download at Apple Store
        await shouldExist(page, '#home-button-edit')
        await clickXpath(page, `//img[@class='icon-apple']`)

        // Verify Url
        const url = await page.url()
        expect(url).to.include('fore')
    })

    it('Show Pop Up Error(Oops), When i Click See Menu without Choose Store', async () => {
		const oops = 'OOPPSS...';
        // Open Homepage Fore
        await loadUrl(page, config.baseUrl)

        // Click "Pilih Menu"
        await shouldExist(page, '#home-button-menu')
        await click(page, '#home-button-menu')

        // Verify Pop up   
        const verifyOops = await getTextXpath(page, `//div[@class='modal-container display-block']//div[@class='popup-title alert-type'][contains(text(),'OOPPSS...')]`)
        expect(verifyOops).to.contain(oops)
    });
})