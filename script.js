document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("todo-input");
  const addTaskButton = document.getElementById("add-task-btn");
  const todoList = document.getElementById("todo-list");

  //take a array to store the all task to array
  //even i click the add task button take the value store into an array
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  //when where i refresh my page store the old task to my current page. so that read the task from local storage and store into to tasks array display the task one by one
  tasks.forEach((task) => renderTask(task));

  addTaskButton.addEventListener("click", () => {
    //take the value
    const taskText = todoInput.value.trim();

    //check the input is empty or not
    if (taskText === "") return;

    //if not for each task assign unique id and task is done or not true or false add other properties also
    //create a object
    const newTask = {
      //create a unique id
      id: Date.now(),
      text: taskText,
      completed: false,
    };

    //push the task to task array
    tasks.push(newTask);

    //after storing the task to a array
    //call the local storage store the currnt value
    saveTasks();
    renderTask(newTask);
    //at the end clean the input
    todoInput.value = "";
    //console.log(tasks);
  });

  //now store the tasks to local storage
  function saveTasks() {
    //key pair value
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  //read from local storage
  function renderTask(task) {
    // console.log(task);
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);

    if (task.completed) li.classList.add("completed");
    li.innerHTML = `
    <span>${task.text}</span>
    <button>delete</button>`;

    li.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") return;

      task.completed = !task.completed;
      li.classList.toggle("completed");

      saveTasks();
    });

    li.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation(); //prevent toggle from firing

      tasks = tasks.filter((t) => t.id !== task.id);
      li.remove();
      saveTasks();
    });
    todoList.appendChild(li);
  }
});
