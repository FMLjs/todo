export { editLocalStorage, getLocalStorage, allToDos, findPos, declOfNum };
let allToDos = [];

const editLocalStorage = (allToDos) => {
    localStorage.setItem('items', JSON.stringify(allToDos));
}

const getLocalStorage = () => {
    const todoStorage = localStorage.getItem('items');
    if (todoStorage === 'undefined' || todoStorage === null) {
        allToDos = [];
    } else {
        allToDos = JSON.parse(todoStorage);
    }
}
const findPos = (value) => {
    return allToDos.map(function (e) { return e.value; })
        .indexOf(value);
}

const declOfNum = (number) => {
    let titles = ['дело', 'дела', 'дел'];
    let cases = [2, 0, 1, 1, 1, 2];
    return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}




