// let tasks = [
//   {
//     title: "قراءة كتاب",
//     isDone: false,
//   },
// ];
function getTasksFromLocalStorage() {
  tasks = JSON.parse(localStorage.getItem("tasks")) ?? [];
}
getTasksFromLocalStorage();
function getAllTask() {
  document.getElementById("task").innerHTML = "";
  let indexId = 0;
  for (task of tasks) {
    document.getElementById("task").innerHTML += `
        <ul class="${task.isDone ? "done" : ""}">
            <li>
              <p>${task.title}</p>
              <div class="icon">
                <i onclick="deleteTask(${indexId})" class="fa-solid fa-trash"></i>
                ${
                  task.isDone
                    ? `<i onclick="doneTask(${indexId})" class="fa-solid fa-close"></i>`
                    : `<i onclick="doneTask(${indexId})" class="fa-solid fa-check"></i>`
                }
                <i onclick="editTask(${indexId})" class="fa-solid fa-pen-to-square"></i>
                
              </div>
            </li>
        </ul>
    `;
    indexId++;
  }
}
getAllTask();

document.getElementById("add").addEventListener("click", function () {
  let taskName = prompt("الرجاء ادخال اسم المهمة");
  if (taskName != "" && taskName != " " && taskName != false) {
    let taskObj = {
      title: taskName,
      isDone: false,
    };
    tasks.push(taskObj);
    setTasks();
    getAllTask();
  }
});
function deleteTask(indexId) {
  let anyTask = tasks[indexId];
  if (confirm("هل انت متأكد من حذف المهمة : " + anyTask.title) == true) {
    tasks.splice(indexId, 1);
    setTasks();
    getAllTask();
  }
}
function editTask(indexId) {
  let taskName = prompt(
    "الرجاء ادخال اسم المهمة الجديد : ",
    tasks[indexId].title
  );
  if (taskName != "null" && taskName != false) {
    tasks[indexId].title = taskName;
    setTasks();
  }
  getAllTask();
}
function doneTask(indexId) {
  tasks[indexId].isDone = !tasks[indexId].isDone;
  setTasks();
  getAllTask();
}
function setTasks() {
  let taskJson = JSON.stringify(tasks);
  localStorage.setItem("tasks", taskJson);
}
