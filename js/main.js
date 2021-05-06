// добавление задач main.html

let mainTaskAdd = document.querySelector('.main-task-add');
let mainTaskDel = document.querySelector('.main-task-del');
let addTask = document.querySelector('.task-add');

mainTaskAdd.addEventListener('click', () => {
  addTask.style.display = "block";
})
mainTaskDel.addEventListener('click', () => {
  addTask.style.display = "none";
})

function AddTask() {
  let taskDateInput = document.querySelector('.task-date-input');
  let taskTextInput = document.querySelector('.task-text-input');
  let addTask = document.querySelector('.task-add');
  
  if(taskTextInput.value !=="" && taskDateInput.value !==""){
    addTask.insertAdjacentHTML("afterEnd",
      ` <div class="task">
          <div class="task-title">
            <div></div>
            <span class="task-date">${taskDateInput.value}</span>
            <img class="main-task-img" src="img/remove.svg" alt="">
          </div>
          <div class="task-text">
            <p>${taskTextInput.value}</p>
          </div>
        </div>
    `);

    let deleteTask = document.querySelectorAll(".main-task-img");
    deleteTask.forEach((e) => {
      e.addEventListener('click', () =>{
        // console.log(e.parentNode.parentNode);
        e.parentNode.parentNode.style.display = 'none';
      })
    });
    taskDateInput.value = '';
    taskTextInput.value = '';
  }

}

//  удаление задачи

let deleteTask = document.querySelectorAll(".main-task-img");
deleteTask.forEach((e) => {
  e.addEventListener('click', () =>{
    // console.log(e.parentNode.parentNode);
    e.parentNode.parentNode.style.display = 'none';
  })
});
