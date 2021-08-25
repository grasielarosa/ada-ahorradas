const getStorage = () => {
  let storage = JSON.parse(localStorage.getItem("ahorradas"));

  if (!storage) {
    storage = {
      categories: [
        { id: '_dpo02a1', name: "alimentación" },
        { id:  '_byculga', name: "alquiler" },
        { id: '_5tfzat6', name: "sueldo" },
      ],
      transactions: [],
    };
  }
  return storage;
};

const createID =  () => {
    return '_' + Math.random().toString(36).substr(2, 7);
}