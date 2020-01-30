const assert = require('assert')
const puppeteer = require('puppeteer')

let browser
let page



  describe('test parallel 4', () => {
    before(async () => {
        browser = await puppeteer.launch({headless : false})
        page = await browser.newPage()
      })
    after(async () => {
        await browser.close()
      })
    it('test parallel', async () => {
        await page.goto(process.env.BASE_URL)
  
  
        await page.waitForSelector('#home-select-store')
        await page.click('#home-select-store')
        
        await page.waitForSelector('#search-store')
        await page.type('#search-store', 'Stasiun Gambir', {delay : 50})
        
        await page.waitForSelector('.store-detail')
        await page.click('.store-detail')
        
        await page.waitForSelector('#espressobase > .menu-list:nth-child(3) > #order-menu-detail > .menu-title-price > .title')
        await page.click('#espressobase > .menu-list:nth-child(3) > #order-menu-detail > .menu-title-price > .title')
        
        await page.waitForSelector('.menu-detail-container #md-add')
        await page.click('.menu-detail-container #md-add')
        
        await page.waitForSelector('.menu-detail-container #md-counter-order')
        await page.click('.menu-detail-container #md-counter-order')
      }).timeout(100000)

      it('test parallel', async () => {
        await page.goto(process.env.BASE_URL)
  
  
        await page.waitForSelector('#home-select-store')
        await page.click('#home-select-store')
        
        await page.waitForSelector('#search-store')
        await page.type('#search-store', 'Stasiun Gambir', {delay : 50})
        
        await page.waitForSelector('.store-detail')
        await page.click('.store-detail')
        
        await page.waitForSelector('#espressobase > .menu-list:nth-child(3) > #order-menu-detail > .menu-title-price > .title')
        await page.click('#espressobase > .menu-list:nth-child(3) > #order-menu-detail > .menu-title-price > .title')
        
        await page.waitForSelector('.menu-detail-container #md-add')
        await page.click('.menu-detail-container #md-add')
        
        await page.waitForSelector('.menu-detail-container #md-counter-order')
        await page.click('.menu-detail-container #md-counter-order')
      }).timeout(100000)
    })