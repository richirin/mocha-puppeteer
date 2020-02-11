const puppeteer = require('puppeteer')
const expect = require('chai').expect

const config = require('../../lib/config')
const {scrollDown, createNewAccount, logout, click, clearInput, clickXpath, loadUrl, shouldExist, getTextXpath } = require('../../lib/helpers')


describe('Menu page ', () => {
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

    it('    ', async() => {
        const product = 'Espresso'
        const quantity =  '1' 
        // Open Home page
        await loadUrl(page, `${config.baseUrl}/order/64`)

        // Click Product
        await clickXpath(page, `//div[@id='espressobase']//div[4]//div[1]//div[2]//p[1]`)
        
        // Scroll down
        await scrollDown(page)

        // Click "Masuk Keranjang"
        await shouldExist(page, '#md-counter-order')
        await click(page, '#md-counter-order')

        // Verify Cart is displayed
        await shouldExist(page, '#container-cart')
        
        // Click same Product
        await clickXpath(page, `//div[@id='espressobase']//div[4]//div[1]//div[2]//p[1]`)

        // Verify Quantity and Product
        const productName = await getTextXpath(page, `//div[@id='menu-detail']//p[@class='title'][contains(text(),'Espresso')]`)
        const productQuantity = await getTextXpath(page, `//div[@id='order-go-mdedit']//div[@class='menu-count']//div//p[@class='total-menu count'][contains(text(),'1')]`)
        expect(productName).to.equal(product)
        expect(productQuantity).to.equal(quantity)

        // Delete Cart
        await shouldExist(page, '#order-go-mdedit')
        await click(page, '#order-go-mdedit')
        await shouldExist(page, '#mdedit-delete')
        await click(page, '#mdedit-delete')
    })

    it.skip('Success add 2 item into the cart, with different additional', async() => {
        // Open Menu Page
        await loadUrl(page, `${config.baseUrl}/order/64`)

        // Click Product
        await clickXpath(page, `//div[@id='espressobase']//div[4]//div[1]//div[2]//p[1]`)
        
        // Click "Masuk Keranjang"
        await shouldExist(page, '#md-counter-order')
        await click(page, '#md-counter-order')

        // Verify Cart is displayed
        await shouldExist(page, '#container-cart')
        
        // Click Product
        await clickXpath(page, `//div[@id='espressobase']//div[4]//div[1]//div[2]//p[1]`)

        //click "Tambah Baru"
        await click(page, '#order-add-new')

        // Add Additional
        await click(page, '.request-sugar > .items > .active')

        // Click "Masuk Keranjang"
        await shouldExist(page, '#md-counter-order')
        await click(page, '#md-counter-order')

        // Verify Cart is displayed
        await shouldExist(page, '#container-cart')
    })

    it('Should Redirect to Checkout page when i click pesan has login', async() => {
        // Create New Account
        await createNewAccount(page)

        // Open Menu page
        await loadUrl(page, `${config.baseUrl}/order/64`)

        // Click Product
        await clickXpath(page, `//div[@id='espressobase']//div[4]//div[1]//div[2]//p[1]`)
        
        // Click "Masuk Keranjang"
        await shouldExist(page, '#md-counter-order')
        await click(page, '#md-counter-order')

        // Click Pesan
        await shouldExist(page, '#order-pesan')
        await click(page, '#order-pesan')

        // Verify Element
        await scrollDown(page)
        await shouldExist(page, '#oc-confirm-now')

        // Verify Url
        const url = await page.url()
        expect(url).to.contain(`${config.baseUrl}/order-confirmation`)

        await logout(page)
    })

    it.skip('Should Redirect to Checkout page when i click pesan without login', async() => {
        // Open Menu page
        await loadUrl(page, `${config.baseUrl}/order/64`)

        // Click Product
        await clickXpath(page, `//div[@id='espressobase']//div[4]//div[1]//div[2]//p[1]`)

        // Click "Masuk Keranjang"
        await shouldExist(page, '#md-counter-order')
        await click(page, '#md-counter-order')

        // Click Pesan
        await shouldExist(page, '#order-pesan')
        await click(page, '#order-pesan')

        // Verify Element
        await shouldExist(page, '#input-daftar')
    })
})