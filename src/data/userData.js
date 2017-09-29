
var UserData = (function () {
    var instance;

    function createInstance() {
        var object = new Object({
            time: new Date,
            user: {
                username: 'misha',
                userId: ''
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
        }
    };
})();

export default UserData;