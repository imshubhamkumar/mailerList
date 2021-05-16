if (process.env.NODE_ENV === 'production') {
    module.exports = {
        API_URL: '',
        SCERET: 'kCINp085KsigJTBPCoxm'
    }
} else {
    module.exports = {
        API_URL: 'http://localhost:5000',
        SCERET: 'kCINp085KsigJTBPCoxm'
    }
}