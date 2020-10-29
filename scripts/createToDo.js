import { getLocalStorage, editLocalStorage, allToDos, findPos } from './utils.js';


/* const todo = new Audio('sound\todo.mp3');
const music = () => {
    todo.play();
}
music();*/
let today = new Date().toISOString().substr(0, 10);
document.querySelector("#today").value = today;
document.querySelector("#today").min = today;

getLocalStorage();
const createOb = (dn) => {
    let form = document.querySelector('#creationForm');
    let toDoOb = {
        value: form.elements[0].value,
        deadline: document.querySelector('input[type="date"]').value,
        done: dn
    }
    return toDoOb;
}
const createListener = async () => {
    let toDoOb = JSON.parse(localStorage.getItem('edit'));
    if (toDoOb !== 'undefined' && toDoOb !== null) {
        let form = document.querySelector('#creationForm');
        let pos = findPos(toDoOb.value);
        let dn = toDoOb.done;
        form.elements[0].value = toDoOb.value;
        document.querySelector('input[type="date"]').value = toDoOb.deadline;
        localStorage.removeItem('edit');
        document.querySelector('#createbtn').addEventListener('click', (e) => {
            e.preventDefault();
            let tbd = createOb(dn);
            allToDos[pos] = tbd;
            editLocalStorage(allToDos);
            window.location.href = '../index.html';
        });
    } else {
        document.querySelector('#createbtn').addEventListener('click', (e) => {
            e.preventDefault();
            let toDoOb = createOb(false);
            if (findPos(toDoOb.value) === -1) {
                allToDos.push(toDoOb);
                editLocalStorage(allToDos);
                window.location.href = '../index.html';
            } else {
                document.querySelector('#error').textContent = 'Такая запись уже существует!';
            }
        });
    }
}

createListener();



document.querySelector('#cancel').addEventListener('click', () => {
    window.location.href = '../index.html';
});
