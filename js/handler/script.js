const element = document.getElementById('counter');

const clickHandler = function (counter) {
    const handler = function (event) {
        counter++;
        element.innerHTML = `Click Me (${counter})`;
        /* Remove Event Listerner if counter === 3 */
        if (counter === 3) element.removeEventListener('click', handler);
    };
    return handler;
};
/* Add Event Listener */
element.addEventListener('click', clickHandler(0));

