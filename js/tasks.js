let inputNewTask = document.querySelector("#inputNewTask");
let btnAddTask = document.querySelector("#btnAddTask");
let taskList = document.querySelector("#taskList");
let windowEdit = document.querySelector("#windowEdit");
let windowEditBackground = document.querySelector("#windowEditBackground");
let windowEditBtnExit = document.querySelector("#windowEditBtnExit");
let btnUpdateTask = document.querySelector("#btnUpdateTask");
let idTaskEdition = document.querySelector("#idTaskEdition");
let inputTaskNameEdition = document.querySelector("#inputTaskNameEdition");

inputNewTask.addEventListener("keypress", (e) => {
  if (e.keyCode === 13) {
    let task = {
      nome: inputNewTask.value,
      id: gerarId(),
    };
    adicionarTarefa(task);
  }
});

windowEditBtnExit.addEventListener("click", (e) => {
  toggleEditingWindow();
});

btnAddTask.addEventListener("click", (e) => {
  let task = {
    nome: inputNewTask.value,
    id: gerarId(),
  };
  adicionarTarefa(task);
  if (inputNewTask.value == "") {
    alert("Adicione uma tarefa");
  } else {
    let li = criarTagLi(task);
    taskList.appendChild(li);
    inputNewTask.value = "";
  }
});

btnUpdateTask.addEventListener("click", (e) => {
  e.preventDefault();
  let idTask = idTaskEdition.innerHTML.replace("#", "");

  let task = {
    nome: inputTaskNameEdition.value,
    id: idTask,
  };

  let currentTask = document.getElementById("" + idTask + "");

  if (currentTask) {
    let li = criarTagLi(task);
    taskList.replaceChild(li, currentTask);
    toggleEditingWindow();
  } else {
    alert("Elemento HTML Não Econtrado");
  }
});

function gerarId() {
  return Math.floor(Math.random() * 3000);
}

function adicionarTarefa(task) {
  let li = criarTagLi(task);
  taskList.appendChild(li);
  inputNewTask.value = "";
}

function criarTagLi(task) {
  let li = document.createElement("li");
  li.id = task.id;

  let span = document.createElement("span");
  span.classList.add("taskText");
  span.innerHTML = task.nome;

  let div = document.createElement("div");

  let btnEdit = document.createElement("button");
  btnEdit.classList.add("btnAction");
  btnEdit.innerHTML = '<i class="fa fa-pencil"></i>';
  btnEdit.setAttribute("onclick", "editTask(" + task.id + ")");

  let btnDelete = document.createElement("button");
  btnDelete.classList.add("btnAction");
  btnDelete.innerHTML = '<i class="fa fa-trash"></i>';
  btnDelete.setAttribute("onclick", "deleteTask(" + task.id + ")");

  div.appendChild(btnEdit);
  div.appendChild(btnDelete);

  li.appendChild(span);
  li.appendChild(div);

  return li;
}

function editTask(taskId) {
  let li = document.getElementById("" + taskId + "");
  if (li) {
    idTaskEdition.innerHTML = "#" + taskId;
    inputTaskNameEdition.value = li.innerText;
    toggleEditingWindow();
  } else {
    alert("Elemento HTML Não Econtrado");
  }
}

function deleteTask(taskId) {
  let confirmation = window.confirm("Tem Certeza que Deseja Excluir?");
  if (confirmation) {
    let li = document.getElementById("" + taskId + "");
    if (li) {
      taskList.removeChild(li);
    } else {
      alert("Elemento HTML Não Econtrado");
    }
  }
}

function toggleEditingWindow() {
  windowEdit.classList.toggle("open");
  windowEditBackground.classList.toggle("open");
}
