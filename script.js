document.addEventListener("DOMContentLoaded", () => {
  const todo_input = document.getElementById("todo-input");
  const add_task_button = document.getElementById("add-task-button");
  const todo_List = document.getElementById("todo-list");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => rendertask(task));

  add_task_button.addEventListener("click", () => {
    const taskText = todo_input.value.trim();
    if (taskText === "") return;
    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };
    tasks.push(newTask);
    savetask();
    rendertask(newTask);
    todo_input.value = "";
    console.log(tasks);
  });
  function rendertask(task) {
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);
    if (task.completed) li.classList.add("completed");
    li.innerHTML = `<div class="conto"><span class="add-li
    ">${task.text}</span>
    <button class="todo-task-button">delete</button></div>`;
    li.addEventListener("click", (e) => {
      if (e.target.tagName === "todo-task-button") return;
      task.completed = !task.completed;
      li.classList.toggle("completed");
      savetask();
    });
    li.querySelector(".todo-task-button").addEventListener("click", (e) => {
      e.stopPropagation();
      tasks = tasks.filter((t) => t.id !== task.id);
      li.remove();
      savetask();
    });
    todo_List.appendChild(li);
  }
  function savetask() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
