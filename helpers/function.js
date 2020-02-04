const login = async (page) => {
    await page.goto('https://devmFore:mccNewdev888@devm.fore.coffee/home')
    await page.waitForSelector('.coate > div > #menu-area > .menu-open > .open', {visible : true})
    await page.click('.coate > div > #menu-area > .menu-open > .open')
    
    await page.waitForSelector('#input-daftar', {visible : true})
    await page.type('#input-daftar', '082298370644')
    
    await page.waitForSelector('.menu #menu-button-continue', {visible : true})
    await page.click('.menu #menu-button-continue')
    
    await page.waitForSelector('.container-registrasi #register-otp-code', {visible : true})
    await page.type('.container-registrasi #register-otp-code', '99999')
}

module.exports = {
    login,
}