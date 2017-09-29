import {appData} from './AppData';
import UserData from './userData';

let CATALOG = 'catalog';

export default class Catalog {
    constructor() {
        appData.setData([]);
    }

    get() {
        return appData.getData(CATALOG);
    }

    set(value) {
        return appData.setData(CATALOG, value);
    }

    getUpdateTime() {
        return appData.getUpdateTime(CATALOG);
    }

    /* will use : https://facebook.github.io/react-native/docs/network.html */
    getAllUserLists() {
        const username = UserData.getAppUsername();
        return fetch('http://192.168.1.12:8000/lists/?username=' + username, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then((res) => {
                return res.json();
            })
            .catch((error) => {
                console.log('Error: ', error)
                return error;
            });
    }

    addListToCatalog(list) {
        var cat = this.get();
        cat = cat.push(list);
        this.set(cat);

        console.log('storing data', list.title);
        var data = {title: list.title, text: 'bbbb'};

        fetch('http://localhost:8000/lists/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
                //'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                //'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
            },
            body: JSON.stringify(data)
        })
        .then((res) => {
            console.log('Stored data: ', data)
            console.log('Stored data, res ', res)
        })
        .catch((error) => {
                console.log('Error: ', error)
            });

    }
}