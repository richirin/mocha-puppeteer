require('dotenv')

module.exports = {
    login: async function(page) {
        await page.goto(process.env.BASE_URL, { waitUntil: 'networkidle0' })

        await page.waitForSelector('#menu-area')
        await page.click('#menu-area')
        
        await page.waitForSelector('#input-daftar')
        await page.type('#input-daftar', process.env.PHONE_NUMBER)
        
        await page.waitForSelector('#menu-button-continue')
        await page.click('#menu-button-continue')
        
        await page.waitForSelector('#register-otp-code')
        await page.type('#register-otp-code', process.env.OTP)
        
        await page.waitForSelector('#register-name-view')
    },

    logout: async function(page){
        await page.goto(process.env.BASE_URL, { waitUntil: 'networkidle0' })

        await page.waitForSelector('#menu-area')
        await page.click('#menu-area')

        await page.waitForSelector('.button-exit')
        await page.click('.button-exit')
        
        await page.waitForSelector('#home-button-menu')

        await page.waitForSelector('#menu-area')
        await page.click('#menu-area')

        await page.waitForSelector('#input-daftar')
    },

    clickXpath: async function(page, xpath) {
        try{
            const element = await page.$x(xpath)
            await element[0].click({delay : 100}) 
        }catch(error){
            throw new Error(`Could not click on xpath: ${xpath}`)
        }
    },

    click: async function(page, selector) {
        try {
            await page.waitForSelector(selector)
            await page.click(selector, {delay : 100})
        } catch (error) {
            throw new Error(`Could not click on selector: ${selector}`)
        }
    },
 
    typeText: async function(page, text, selector) {
        try {
            await page.waitForSelector(selector)
            await page.type(selector, text)
        } catch (error) {
            throw new Error(`Could not type text into selector: ${selector}`)
        }
    },
 
    loadUrl: async function(page, url) {
        await page.goto(url, { waitUntil: 'networkidle0' })
    },
    getTextXpath: async function(page, xpath) {
        try{
            const title = await page.$x(xpath);
            return page.evaluate(text => text.textContent, title[0]);
        }catch{
            throw new Error(`Cannot not read the xpath : ${selector}`)
        }
    },

    getText: async function(page, selector) {
        try {
            await page.waitForSelector(selector)
            return page.$eval(selector, e => e.innerHTML)
        } catch (error) {
            throw new Error(`Cannot get text from selector: ${selector}`)
        }
    },

    getAttributeHref: async function(page, selector){
        try {
            return await page.$$eval(selector, anchors => [].map.call(anchors, a => a.href));
        } catch (error) {
            throw new Error(`Cannot get attribute from selector : ${selector}`)
        }
    },
 
    getCount: async function(page, selector) {
        try {
            await page.waitForSelector(selector)
            return page.$$eval(selector, items => items.length)
        } catch (error) {
            throw new Error(`Cannot get count of selector: ${selector}`)
        }
    },
 
    waitForText: async function(page, selector, text) {
        try {
            await page.waitForSelector(selector)
            await page.waitForFunction(
                (selector, text) =>
                    document.querySelector(selector).innerText.includes(text),
                {},
                selector,
                text
            )
        } catch (error) {
            throw new Error(`Text: ${text} not found for selector ${selector}`)
        }
    },
 
    pressKey: async function(page, key) {
        try {
            await page.keyboard.press(key)
        } catch (error) {
            throw new Error(`Could not press key: ${key} on the keyboard`)
        }
    },
 
    shouldExist: async function(page, selector) {
        try {
            await page.waitForSelector(selector, { visible: true })
        } catch (error) {
            throw new Error(`Selector: ${selector} not exist`)
        }
    },
 
    shouldNotExist: async function(page, selector) {
        try {
            await page.waitFor(() => !document.querySelector(selector))
        } catch (error) {
            throw new Error(`Selector: ${selector} is visible, but should not`)
        }
    },

    clearInput: async function(page, selector){
        await page.click(selector, {clickCount : 3})
        await page.keyboard.press('Backspace')
    },

    scrollDown: async function(page, scrollStep = 250, scrollDelay = 100) {
        const lastPosition = await page.evaluate(
          async (step, delay) => {
            const getScrollHeight = (element) => {
              const { scrollHeight, offsetHeight, clientHeight } = element
              return Math.max(scrollHeight, offsetHeight, clientHeight)
            }
      
            const position = await new Promise((resolve) => {
              let count = 0
              const intervalId = setInterval(() => {
                const { body } = document
                const availableScrollHeight = getScrollHeight(body)
      
                window.scrollBy(0, step)
                count += step
      
                if (count >= availableScrollHeight) {
                  clearInterval(intervalId)
                  resolve(count)
                }
              }, delay)
            })
      
            return position
          },
          scrollStep,
          scrollDelay,
        )
        return lastPosition
      }
}