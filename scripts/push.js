export { notifyUser, getPermisson, initializeClock };

const getPermisson = () => {
    Notification.requestPermission();
}
const notifyUser = (toDoOb) => {
    if (!('Notification' in window)) {
        console.log('This browser does not support notifications')
    } else if (Notification.permission === 'granted') {
        notify(toDoOb);
    } else {
        alert('У Вас отлючены пуш уведомления! Включите, что бы я мог информировать о предстоящих делах')
    }
}

const notify = (toDoOb) => {
    var notification = new Notification('Скоро дела!', {
        icon: '/../static/picture/todoicon.png',
        body: toDoOb.value,
    });

    notification.onclick = () => {
        localStorage.setItem('edit', JSON.stringify(toDoOb));
        window.location.href = ('pages/ToDoCreation.html');
    }
}

function getTimeRemaining(endtime) {
    const total = Date.parse(endtime) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));

    return {
        total,
        days,
        hours,
        minutes,
        seconds
    };
}

function initializeClock(toDoOb) {
    function updateClock() {
        const t = getTimeRemaining(toDoOb.deadline);
        if (t.hours > 0 && t.hours <= 24 && t.days === 0) {
            notifyUser(toDoOb)
            setTimeout(updateClock, 43200000);
        } else {
            setTimeout(updateClock, 60000);
        }
    }
    updateClock();
}
