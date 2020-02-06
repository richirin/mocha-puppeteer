const puppeteer = require('puppeteer')
const expect = require('chai').expect

const config = require('../../lib/config')
const {clickXpath, click, typeText, loadUrl, waitForText, pressKey, shouldExist, getTextXpath, getText} = require('../../lib/helpers')


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

    it('Should close menu bar, when i click Beranda at home page', async() => {
        // Open Home page
        await loadUrl(page, `${config.baseUrl}/home`)
        
        // CLick Menu Bar/Burger Menu
        await shouldExist(page, '#menu-area')
        await click(page, '#menu-area')

        // CLick Menu Bar/Burger Menu
        await shouldExist(page, '#nav-button-beranda')
        await click(page, '#nav-button-beranda')

        await shouldExist(page, '#home-button-menu')
        // Verify Url
        const url = await page.url()
        expect(url).to.contain(`${config.baseUrl}/home`)
    })

    it('Should redirect to Download Page', async() => {
        // Open Home page
        await loadUrl(page, `${config.baseUrl}/home`)
        
        // CLick Menu Bar/Burger Menu
        await shouldExist(page, '#menu-area')
        await click(page, '#menu-area')

        // CLick Menu Bar/Burger Menu
        await shouldExist(page, '#nav-button-beranda')
        await clickXpath(page, `//a[contains(text(),'Download')]`)

        await shouldExist(page, '#menu')
        // Verify Url
        const url = await page.url()
        expect(url).to.include('download-apps')
    })

    it('Should redirect to Locations New Page', async() => {
        // Open Home page
        await loadUrl(page, `${config.baseUrl}/home`)
        
        // CLick Menu Bar/Burger Menu
        await shouldExist(page, '#menu-area')
        await click(page, '#menu-area')

        // CLick Menu Bar/Burger Menu
        await shouldExist(page, '#nav-button-beranda')
        await clickXpath(page, `//a[contains(text(),'Lokasi Store')]`)

        await shouldExist(page, '#menu')
        // Verify Url
        const url = await page.url()
        expect(url).to.include('locations-new')
    })

    it('Should redirect to Foreblog Page', async() => {
        // Open Home page
        await loadUrl(page, `${config.baseUrl}/home`)
        
        // CLick Menu Bar/Burger Menu
        await shouldExist(page, '#menu-area')
        await click(page, '#menu-area')

        // CLick Menu Bar/Burger Menu
        await shouldExist(page, '#nav-button-beranda')
        await clickXpath(page, `//a[contains(text(),'Foreblog')]`)

        await shouldExist(page, '#menu')
        // Verify Url
        const url = await page.url()
        expect(url).to.include('forenews')
    })

    it('Should redirect to Karir Page', async() => {
        // Open Home page
        await loadUrl(page, `${config.baseUrl}/home`)
        
        // CLick Menu Bar/Burger Menu
        await shouldExist(page, '#menu-area')
        await click(page, '#menu-area')

        // CLick Menu Bar/Burger Menu
        await shouldExist(page, '#nav-button-beranda')
        await clickXpath(page, `//a[contains(text(),'Karir')]`)

        await shouldExist(page, '#menu')
        // Verify Url
        const url = await page.url()
        expect(url).to.include('career')
    })

    it('Should redirect to Tentang Kami Page', async() => {
        // Open Home page
        await loadUrl(page, `${config.baseUrl}/home`)
        
        // CLick Menu Bar/Burger Menu
        await shouldExist(page, '#menu-area')
        await click(page, '#menu-area')

        // CLick Menu Bar/Burger Menu
        await shouldExist(page, '#nav-button-beranda')
        await clickXpath(page, `//a[contains(text(),'Tentang Kami')]`)

        await shouldExist(page, '#menu')
        // Verify Url
        const url = await page.url()
        expect(url).to.include('about-me')
    })

    it('Should redirect to Kontak Page', async() => {
        // Open Home page
        await loadUrl(page, `${config.baseUrl}/home`)
        
        // CLick Menu Bar/Burger Menu
        await shouldExist(page, '#menu-area')
        await click(page, '#menu-area')

        // CLick Kotak
        await shouldExist(page, '#nav-button-beranda')
        await clickXpath(page, `//a[contains(text(),'Kontak')]`)

        await shouldExist(page, '#menu')
        // Verify Url
        const url = await page.url()
        expect(url).to.include('contact-us')
    })
})
