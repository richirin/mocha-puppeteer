require('dotenv').config()

module.exports = {
    baseUrl : String(process.env.BASE_URL),
    isHeadless : false,
    slowMo : parseInt(process.env.SLOW_MO),
    isDevtools : false,
    timeout : parseInt(process.env.TIMEOUT),
    viewportHeight : parseInt(process.env.VIEWPORT_HEIGHT),
    viewportWidth : parseInt(process.env.VIEWPORT_WIDTH),
    phoneNumber1 : String(process.env.PHONE_NUMBER1),
    phoneNumber2 : String(process.env.PHONE_NUMBER2),
    phoneNumber3 : String(process.env.PHONE_NUMBER3),
    otp : String(process.env.OTP),
    searchStore : String(process.env.SEARCH_STORE),
    userFore : String(process.env.USER_FORE),
}