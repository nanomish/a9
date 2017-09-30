
var UserData = (function () {
    var instance;

    function createInstance() {
        var object = new Object({
            time: new Date,
            user: {
                username: 'misha',
                userId: '',
                token: ''
            }
        });
        return object;
    }

    function getAppUser() {
        return this.getInstance().user.username;
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        },
        getAppUsername: function() {
            return this.getInstance().user.username;
        },
        getUserId: function() {
            return this.getInstance().user.userId;
        },
        setToken: function(token) {
            return this.getInstance().user.token = token;
        },
        getToken: function() {
            return this.getInstance().user.token;
        }
    };
})();

export default UserData;