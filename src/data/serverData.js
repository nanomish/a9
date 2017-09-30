

var ServerData = (function () {
    var instance;

    function createInstance() {
        var object = new Object({
            time: new Date,
            server: {
                serverUrl: 'http://192.168.1.12:8000',
            }
        });
        return object;
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        },
        getServerUrl: function() {
            return this.getInstance().server.serverUrl;
        }
    };
})();

export default ServerData;