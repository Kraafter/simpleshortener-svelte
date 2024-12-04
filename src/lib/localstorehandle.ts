// src/lib/utils/syncMapWithLocalStorage.js

import { get } from 'svelte/store';


export function syncMapWithLocalStorage(store, key) {

    // Load initial value from local storage

    const storedValue = typeof window !== 'undefined' ? localStorage.getItem(key) : null;

    if (storedValue) {

        const obj = JSON.parse(storedValue);

        const map = new Map(Object.entries(obj)); // Convert object back to Map

        store.set(map);

    }


    // Subscribe to changes and update local storage

    if (typeof window !== 'undefined') {

        store.subscribe(value => {

            const obj = Object.fromEntries(value); // Convert Map to object

            localStorage.setItem(key, JSON.stringify(obj));

        });

    }

}