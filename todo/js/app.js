let TODO_LIST = [
  'Complete Javascript course',
  'record video',
  'Learning',
  'reading Book',
  'GYM',
  'Laragon GUIde',
];

const eletodoList = document.querySelector('.todo-list');
const eletodoItem = document.querySelector('.todo-item');
const inputSearch = document.querySelector('.input-search');
const btnSearch = document.querySelector('.btn-search');
const btnClear = document.querySelector('.btn-clear');

const inputTodo = document.querySelector('.input-todo');
const btnCreate = document.querySelector('.btn-create');

renderList(TODO_LIST);

btnClear.addEventListener('click', () => {
  inputSearch.value = '';
  renderList(TODO_LIST);
});

btnSearch.addEventListener('click', () => {
  const subList = TODO_LIST.filter((str) =>
    str.toLocaleLowerCase().includes(inputSearch.value.toLowerCase())
  );
  renderList(subList);
});

function renderItem(item, idx) {
  return `
        <div class='todo-item'>
         <span class='todo-name'>${item}</span>
         <div class='todo-action'>
           <button class='btn bg-warning'>Edit</button>
           <button class='btn bg-danger' onclick="deleteItem(${idx})">Delete</button>
         </div>
       </div>
    `;
}

function renderList(list) {
  let todoList = '';
  list.forEach((todo, idx) => {
    todoList += renderItem(todo, idx);
  });

  eletodoList.innerHTML = todoList;
}

btnCreate.addEventListener('click', () => {
  if (inputTodo.value.trim() === '') {
    alert('Vui long nhap');
    return;
  }

  TODO_LIST.unshift(inputTodo.value.trim());
  renderList(TODO_LIST);
  inputTodo.value = '';
});
