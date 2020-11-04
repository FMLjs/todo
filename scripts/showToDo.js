import { getLocalStorage, editLocalStorage, allToDos, findPos, declOfNum } from './utils.js';
import { getPermisson, initializeClock } from './push.js';


const showToDos = function () {
    allToDos.forEach(function (item) {
        addToPage(item);
    });
}
window.searchToDo = function () {
    var input, filter, ul, li, a, i, txtValue;
    input = document.querySelector('#to-do-input');
    filter = input.value.toUpperCase();
    ul = document.getElementById("to-do-ul");
    li = ul.querySelectorAll('#wrapper');

    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}
const greet = async () => {
    let name = localStorage.getItem('name');
    if (name === null || name === 'undefined') {
        name = prompt('Как тебя зовут?')
        localStorage.setItem('name', name);
    }
    let count = 0;
    allToDos.forEach(todo => {
        if (!todo.done) {
            count++;
        }
    });

    let grt = [`Привет, ${name}!`, `У тебя запланированно ${count} ${declOfNum(count)}!`,
    count > 0 ? 'Не откладывай всё до последнего момента!' : 'Пора бы начать планировать свою жизнь!'];
    let index = 0;
    while (true) {
        if (index === grt.length) {
            index = 0;
        }
        for (let i = 0; i < grt[index].length; i++) {
            await printGreetings(grt[index][i]);
        }
        await wait();
        for (let i = grt[index].length - 1; i >= 0; i--) {
            await removeGreetings();
        }
        index++;
    }

}

window.showCheckedToDos = () => {
    let chkBox = document.querySelector('#only-to-do');
    let alltd = document.querySelector('#to-do-ul').querySelectorAll('#wrapper');
    if (chkBox.checked) {
        alltd.forEach(todo => {
            console.log(todo.querySelector('#left > li > a'));
            if (todo.querySelector('#left > li > a').classList.contains('completed')) {
                todo.style.display = 'none';
            }
        });
    } else {
        location.reload();
    }
}
const printGreetings = async (value) => {
    let h1 = document.querySelector('#greetings');
    return new Promise(resolve => setTimeout(() => {
        h1.textContent += value;
        resolve(h1);
    }, 100));
};
const removeGreetings = async () => {
    let h1 = document.querySelector('#greetings');
    return new Promise(resolve => setTimeout(() => {
        let txt = h1.textContent;
        h1.textContent = txt.slice(0, txt.length - 1);
        resolve(h1);
    }, 100));
}

const wait = () => {
    return new Promise(resolve => setTimeout(() => {
        resolve();
    }, 2000));
}
getPermisson();
getLocalStorage();
showToDos();
greet();

function addToPage(toDoOb) {
    if (!toDoOb.done) {
        initializeClock(toDoOb);
    }
    let ul = document.querySelector('#to-do-ul');
    let li = document.createElement('li');
    let a = document.createElement('a');
    a.setAttribute('href', '#');
    a.appendChild(document.createTextNode(toDoOb.value.length > 52 ? toDoOb.value.slice(0, 55) + '...' : toDoOb.value));
    a.addEventListener('click', () => {
        localStorage.setItem('edit', JSON.stringify(toDoOb));
        window.location.href = ('/../pages/toDoCreation.html');
    });
    li.appendChild(a);
    colorize(toDoOb, a);

    let fTd = document.createElement('div');
    fTd.setAttribute('id', 'wrapper');

    let btnDlt = document.createElement('button');
    btnDlt.appendChild(document.createElement('i')).setAttribute('class', 'fa fa-trash');
    btnDlt.style.color = 'red';
    btnDlt.addEventListener(('click'), () => {
        removeToDo(toDoOb, fTd);
    });
    li.appendChild(btnDlt);

    let btnChk = document.createElement('button');
    btnChk.appendChild(document.createElement('i')).setAttribute('class', 'fa fa-check');
    btnChk.style.color = 'yellow';
    btnChk.addEventListener('click', () => {
        toDoOb.done = !toDoOb.done;
        colorize(toDoOb, a)
        editLocalStorage(allToDos);
    });
    li.appendChild(btnChk);

    let btnEdt = document.createElement('button');
    btnEdt.appendChild(document.createElement('i')).setAttribute('class', 'fa fa-edit');
    btnEdt.style.color = 'green';
    btnEdt.addEventListener('click', () => {
        localStorage.setItem('edit', JSON.stringify(toDoOb));
        window.location.href = "/../pages/toDoCreation.html";
    });
    let btns = document.createElement('div');
    btns.setAttribute('id', 'right');
    btns.append(btnDlt, btnChk, btnEdt)
    let td = document.createElement('div');
    td.setAttribute('id', 'left');
    td.appendChild(li);
    fTd.append(td, btns);
    ul.appendChild(fTd);
}

//задание выполнено
function colorize(toDoOb, a) {
    if (toDoOb.done === true) {
        a.classList.remove('tbd');
        a.classList.add('completed');
    } else {
        a.classList.remove('completed');
        a.classList.add('tbd');
    }
}

//удалить конкретную запись
function removeToDo(toDoOb, div) {
    allToDos.splice(findPos(toDoOb.value), 1);
    editLocalStorage(allToDos);
    div.remove();
}

//удалить все записи
document.querySelector('#to-do-clear').addEventListener('click', () => {
    localStorage.removeItem('items');
    location.reload();
});



