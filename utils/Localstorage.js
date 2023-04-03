//import module
import { LocalStorage } from 'node-localstorage'

// constructor function to create a storage directory inside our project for all our localStorage setItem.
const localStorage = new LocalStorage('./storage');

//Setting localStorage Item
export const getLocalStorage = (key) => {
    if (!localStorage) {
        return false;
    }

    if (!localStorage.getItem(key)) {
        return false;
    }

    return localStorage.getItem(key);
}

//Setting localStorage Item
export const setLocalStorage = (key, value) => {
    if (!localStorage) {
        return false;
    }
    localStorage.setItem(key, value)
}

// empty all localStorage
export const clearLocalStorage = () => {
    if (!localStorage) {
        return false;
    }
    localStorage.clear();
}