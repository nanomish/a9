import {AsyncStorage} from 'react-native';

export default {
    /** Those methods work with strings */
    set(key, value) {
        return AsyncStorage.setItem(key, value);
    },

    get(key) {
        return AsyncStorage.getItem(key);
    }
}
