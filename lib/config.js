require('dotenv').config()

module.exports = {
    baseUrl : String(process.env.BASE_URL),
    isHeadless : false,
    slowMo : parseInt(process.env.SLOW_MO),
    isDevtools : false,
    timeout : parseInt(process.env.TIMEOUT),
    viewportHeight : parseInt(process.env.VIEWPORT_HEIGHT),
    viewportWidth : parseInt(process.env.VIEWPORT_WIDTH),
    phoneNumber : String(process.env.PHONE_NUMBER),
    otp : String(process.env.OTP),
}