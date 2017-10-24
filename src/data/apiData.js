import ServerData from '../data/serverData';

export default {
    request: function(url, method, body) {
        var object = {
            method: method,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            },
            body: JSON.stringify(body)
        };
        if (method.toLowerCase() === 'get') {
            delete object.body;
        }
        return fetch(ServerData.getServerUrl() + '/' + url, method, object)
    },

    postRequest: function(url, body) {
        return this.request(url, 'POST', body)
    },

    runGetRequest: function(url) {
        return this.request(url, 'GET');
    }
}
