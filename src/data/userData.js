/*

export class userData {
    constructor() {
        this.time = new Date();
        this.user = {
            username: 'misha'
        }
    }

    getAppUser() {
        return this.user;
    }

    getUpdateTime(key) {
        return this[key] && this[key]._updateTime || this.time;
    }

}

export let userData = new userData();

*/

var UserData = (function () {
    var instance;

    function createInstance() {
        var object = new Object({
            time: new Date,
            user: {
                username: 'misha'
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
        }
    };
})();

export default UserData;