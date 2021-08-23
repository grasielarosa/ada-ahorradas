const getStorage = () => {
    let storage = JSON.parse(localStorage.getItem('ahorradas'));

    if (!storage) {
        storage = {
            categories: [],
            transactions: [],
        };
    }
    return storage
}