export const getUrl = (endpoint,limit,offset) => {
    const md5 = require('blueimp-md5');
    const publickey = process.env.REACT_APP_PUBLIC_KEY;
    const privatekey = process.env.REACT_APP_PRIVATE_KEY;
    const ts = new Date().getTime();
    const stringToHash = ts + privatekey + publickey;
    const hash = md5(stringToHash);
    const baseUrl = `${process.env.REACT_APP_BASE_URL}/v1/public/${endpoint}`;
    let url = baseUrl + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash ;
    if (limit) url = url + '&limit=' + limit
    if (offset) url = url + '&offset=' + offset
    return url
}
