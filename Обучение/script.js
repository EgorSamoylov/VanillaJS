'use strict';

console.log('Hello World!')
let toDos = [];
let array = document.getElementById("array");
let str = '';
let counter = 0;
let edited = false;
document.getElementById('AddBut').onclick = AddFunc;
document.getElementById('RemoveBut').onclick = RemoveFunc;
document.getElementById('EditBut').onclick = EditFunc;

// Добавить элемент
function AddFunc() {
    let input = document.getElementById("addText");
    // заполняем toDos (модель данных)
    toDos.push({
        id: counter,
        text: input.value,
        isEdited: edited
    });
    // alert(toDos.pop().isEdited);

    // рендер
    render();
    
    // увеличим наш id
     counter++;       
}

// Удалить элемент
function RemoveFunc(){
    let removeNum = document.getElementById('RemoveNum').value;
    if (removeNum >= 0 && removeNum < toDos.length){
        // модель данных
        toDos.splice(removeNum, 1);

        // рендер
        render();
    }else{
        alert('Какая-то фигня!')
    }
}

// Изменить элемент
function EditFunc(){
    let editNum = document.getElementById('NumEdit').value;
    let editValue = document.getElementById('EditText').value;
    if (editNum >= 0 && editNum < toDos.length && editValue !== null){
        // модель данных
        toDos[editNum].text = editValue;

        // рендер
        render();
    }
    else{
        alert('какая-то фигня(');
    }
}

// Весь рендеринг

// основная функция отрисовки
function render() {
    array.innerHTML = "";
    renderForArray();
}

// заполение array элементами toDos-а
function renderForArray() {
    for (var i = 0; i < toDos.length; i++){
        var div = CreateDiv(toDos[i].id, toDos[i].text);
        array.appendChild(div);
    }
}

// дополнительная функция для создания элементов div для array
function CreateDiv(Id, input) {
    // Создаем элементы
    var div = document.createElement('div');
    var btn = document.createElement('button');
    var br = document.createElement('br');
    var editBtn = document.createElement('button');
    var readyBtn = document.createElement('button');
    var readyInput = document.createElement('input');


    // задаем id и значения     
    var numObjWithId = toDos.findIndex((obj) => obj.id == Id);
    div.innerHTML = input;
    div.id = Id;
    btn.id = Id;
    editBtn.id = Id;
    readyBtn.id = Id;
    readyInput.id = Id;
    btn.innerHTML = 'удалить';
    editBtn.innerHTML = 'редактировать';
    readyBtn.innerHTML = 'готово';
    readyInput.value = input;
    readyInput.text = input;

    // обработки нажатий кнопок
    btn.onclick = function() {
        var numObjWithIdBtn = toDos.findIndex((obj) => obj.id == btn.id);
        toDos.splice(numObjWithIdBtn, 1);
        render();
    }

    // нажимаем кнопку 'редактировать'
    editBtn.onclick = function() {
        var numObjWithId = toDos.findIndex((obj) => obj.id == editBtn.id);
        toDos[numObjWithId].isEdited = !toDos[numObjWithId].isEdited;
        render();
    }

    // нажатие кнопки 'готово'
    readyBtn.onclick = function() {
        var numObjWithId = toDos.findIndex((obj) => obj.id == readyBtn.id);
        toDos[numObjWithId].text = readyInput.value;
        toDos[numObjWithId].isEdited = !toDos[numObjWithId].isEdited;      
        render();
    }

    // добавление всех элементов в общий div
    if (toDos.length > 0 && toDos[numObjWithId].isEdited) {
        div.innerHTML='';
        div.appendChild(readyInput);
    } else {
        if (toDos.length > 0) {
            div.innerHTML = toDos[numObjWithId].text;
        }
    }
    div.appendChild(btn); 
    if (toDos.length > 0 && toDos[numObjWithId].isEdited) {
        div.appendChild(readyBtn);
    } else {
        if (toDos.length > 0) {
            div.appendChild(editBtn);            
        }
    }
    div.appendChild(br);
    return div;
}