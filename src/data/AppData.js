
export class AppData {
    constructor() {
        this.time = new Date();
    }

    setData(key, data, _updateTime) {
        this[key] = {
            data,
            _updateTime: _updateTime || new Date()
        };
        return true;
    }

    getData(key) {
        return this[key] && this[key].data || [];
    }

    getUpdateTime(key) {
        return this[key] && this[key]._updateTime || this.time;
    }

}

export let appData = new AppData();