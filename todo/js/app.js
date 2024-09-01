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
const elTodoName = document.querySelector('.todo-name');
const inputTodo = document.querySelector('.input-todo');
const btnCreate = document.querySelector('.btn-create');
const btnCancel = document.querySelector('.bg-warning');
const btnSortDefault = document.querySelector('.bg-default');
const btnSortAsc = document.querySelector('.bg-primary');
const btnSortDesc = document.querySelector('.bg-success');
let idxEdit = null;

renderList(TODO_LIST);

function renderItem(item, idx) {
  return `
        <div class='todo-item'>
         <span class='todo-name'>${item}</span>
         <div class='todo-action'>
           <button class="btn bg-warning" onclick="editItem(${idx})">Edit</button>
           <button class="btn bg-danger btn-delete" data-idx="${idx}" onclick="deleteItem(${idx})">Delete</button>
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

// delete item at index idx: remove from TODO_LIST then re-render list on screen
function deleteItem(idx) {
  if (confirm('Are you sure you want to delete this item?')) {
    TODO_LIST.splice(Number(idx), 1);
    renderList(TODO_LIST);
  }
}

// edit item: save index of edited item to localStorage
function editItem(idx) {
  inputTodo.value = TODO_LIST[Number(idx)];
  btnCreate.textContent = 'Update';
  btnCreate.style.backgroundColor = 'green';
  idxEdit = idx;
}

btnClear.addEventListener('click', () => {
  inputSearch.value = '';
  renderList(TODO_LIST);
});

btnSearch.addEventListener('click', () => {
  const inSearch = inputSearch.value;
  const subList = TODO_LIST.filter((str) =>
    str.toLowerCase().includes(inSearch.toLowerCase())
  ).map((item) => {
    const highlightedItem = item.replace(
      new RegExp(inSearch, 'gi'),
      (match) => `<span class="highlight">${match}</span>`
    );
    return highlightedItem;
  });
  // const highlightedStr = `<span class="highlight>${inSearch}</span>`;);
  renderList(subList);
});

function replaceItem(array, oldItem, newItem) {
  return array.map((item) => (item === oldItem ? newItem : item));
}

btnCreate.addEventListener('click', () => {
  const newTodo = inputTodo.value.trim();

  if (newTodo === '' && btnCreate.textContent.toLowerCase() === 'update') {
    alert('Vui long edit voi gia tri khac rong.');
    return;
  }

  if (newTodo === '') {
    alert('Vui long nhap');
    return;
  }

  if (idxEdit) {
    TODO_LIST[idxEdit] = newTodo;
    resetButton();
    idxEdit = null;
  } else {
    TODO_LIST.unshift(newTodo);
  }

  renderList(TODO_LIST);
  inputTodo.value = '';
});

btnCancel.addEventListener('click', () => {
  resetButton();
  inputTodo.value = '';
});

function resetButton() {
  btnCreate.textContent = 'Create';
  btnCreate.style.backgroundColor = '#ac41ff';
}

btnSortAsc.addEventListener('click', () => {
  sortTodos('asc');
});
btnSortDesc.addEventListener('click', () => {
  sortTodos('desc');
});

btnSortDefault.addEventListener('click', () => {
  sortTodos();
});

function sortTodos(direction = 'default') {
  const sortedList = [...TODO_LIST];
  if (direction !== 'default') {
    sortedList.sort((a, b) => {
      a = a.toLowerCase();
      b = b.toLowerCase();

      if (direction === 'asc') {
        return a < b ? -1 : 1;
      } else if (direction === 'desc') {
        return a < b ? 1 : -1;
      }
    });
  }
  renderList(sortedList);
}
