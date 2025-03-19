const CryptoJS = require('crypto-js');  
const compression = require('compression')

module.exports.encrypt=(text)=>{
    const encodedWord = CryptoJS.enc.Utf8.parse(text); // encodedWord Array object
    const encoded = CryptoJS.enc.Base64.stringify(encodedWord); // string: 'NzUzMjI1NDE='
    return encoded;
}

module.exports.decrypt=(text)=>{
    const encodedWord = CryptoJS.enc.Base64.parse(text); // encodedWord via Base64.parse()
    const decoded = CryptoJS.enc.Utf8.stringify(encodedWord); // decode encodedWord via Utf8.stringify() '75322541'
    return decoded;
}

module.exports.shouldCompress=(req,res)=>{
    if (req.headers['x-no-compression']) {
        // don't compress responses with this request header
        return false
    }

    // fallback to standard filter function
    return compression.filter(req, res)
}

module.exports.convertTimeStampToDate=(unixtimestamp)=>{
    var d = new Date(unixtimestamp* 1000);
    return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
}

