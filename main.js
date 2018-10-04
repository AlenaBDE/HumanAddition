let men = {
    left: 'url("img/left.png")',
    right: 'url("img/right.png")',
    front: 'url("img/front.png")',
    back: 'url("img/back.png")'
};

let table;
let currentCell;
const rows = 7;
const cells = 7;

const leftKey = 37, upKey = 38, rightKey = 39, downKey = 40;
let coords = {x: 0, y: 0};

document.addEventListener("DOMContentLoaded", createTable(rows, cells));

function randomWay() {
    let mass = [37, 39, 40, 38];
    return mass[Math.floor(Math.random() * (mass.length - 0 + 0)) + 0];
}


function go() {
    let code = randomWay();
    switch (code) {
        case 37:
            engine(leftKey);
            break;
        case 39:
            engine(rightKey);
            break;
        case 40:
            engine(downKey);
            break;
        case 38:
            engine(upKey);
            break;
    }
};

function letsGo() {
    setTimeout(function run() {
        (function go() {
            let code = randomWay();
            switch (code) {
                case 37:
                    engine(leftKey);
                    break;
                case 39:
                    engine(rightKey);
                    break;
                case 40:
                    engine(downKey);
                    break;
                case 38:
                    engine(upKey);
                    break;
            }
        })();
        setTimeout(run, 1000);
    }, 1000);
}

document.onkeydown = function (event) {
    switch (event.keyCode) {
        case 37:
            engine(leftKey);
            break;
        case 39:
            engine(rightKey);
            break;
        case 40:
            engine(downKey);
            break;
        case 38:
            engine(upKey);
            break;
    }
};

function engine(direction) {
    let cell = document.getElementById('table').rows[coords.y].cells[coords.x];
    cell.style.backgroundImage = '';
    counting(direction);
    cell = document.getElementById('table').rows[coords.y].cells[coords.x];

    switch (direction) {
        case leftKey:
            cell.style.backgroundImage = men.left;
            break;
        case rightKey:
            cell.style.backgroundImage = men.right;
            break;
        case upKey:
            cell.style.backgroundImage = men.back;
            break;
        case downKey:
            cell.style.backgroundImage = men.front;
            break;
    }
};

function CheckWay(cell, direction) {
    if (direction === leftKey && coords.x > 0 && cell.style.borderLeftWidth === "") {
        return true
    }
    ;
    if (direction === rightKey && coords.x < 7 && cell.style.borderRightWidth === "") {
        return true;
    }
    if (direction === upKey && coords.y > 0 && cell.style.borderTopWidth === "") {
        return true;
    }
    if (direction === downKey && coords.y < 7 && cell.style.borderBottomWidth === "") {
        return true;
    }
    return false;
};


function incCoords(direction) {
    coords.x -= (direction === leftKey && coords.x > 0);
    coords.x += (direction === rightKey && coords.x < 6);
    coords.y -= (direction === upKey && coords.y > 0);
    coords.y += (direction === downKey && coords.y < 6);
};

function counting(direction) {
    let negativeDirection = direction === rightKey ? leftKey : direction === leftKey ?
        rightKey : direction === upKey ? downKey : direction === downKey ? upKey : null;

    currentCell = document.getElementById('table').rows[coords.y].cells[coords.x];

    if (CheckWay(currentCell, direction)) {
        incCoords(direction);
        currentCell = document.getElementById('table').rows[coords.y].cells[coords.x];
        if (CheckWay(currentCell, negativeDirection)) {
        } else {
            incCoords(negativeDirection);
        }
    }
};

function createTable(rows, cells) {
    let table = document.createElement('table');
    let div_table = document.getElementById('div_table');
    div_table.appendChild(table);
    table.setAttribute('border', '1');
    table.id = 'table';
    table.cellSpacing = '10';
    for (let i = 1; i <= cells; i++) {
        let tr = document.createElement('tr');
        table.appendChild(tr);
        for (let j = 1; j <= rows; j++) {
            let td = document.createElement('td');
            tr.appendChild(td);
        }
    }
    document.getElementById('table').rows[0].cells[0].style.backgroundImage = men.right;
    table = document.getElementById("table");
    makeBorder(table);
};


function makeBorder(table) {
    let sides = {
        1: "borderLeftWidth",
        2: "borderRight",
        3: "borderTopWidth",
        4: "borderBottomWidth",
    };

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cells; j++) {
            if (Math.random() <= 0.3) {
                let randomSize = sides[Object.keys(sides)[Math.floor(Math.random() * (Object.keys(sides).length + 0))]];
                table.rows[i].cells[j].style[randomSize] = '5px';
            }
        }
    }
}


