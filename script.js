const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress")
const done = document.querySelector("#done")
//console.log(todo,progress,done)
let dragElement = null

let task = document.querySelectorAll(".task")
task.forEach((elem)=>{
    elem.addEventListener("dragstart",(e)=>{
        dragElement = elem;
       //dragElement = storeTask
    })
})

function addDragEventOnColumn(column){
    
column.addEventListener("dragenter",(e)=>{
    column.classList.add("hover-over")
})

column.addEventListener("dragleave",()=>{
   column.classList.remove("hover-over")
})


column.addEventListener("dragover",(e)=>{
      e.preventDefault()

})

column.addEventListener("drop",(e)=>{
      e.preventDefault()
      let sourceColumn = dragElement.parentElement;//target initial element

      //console.log("see elements",dragElement,column);
      column.append(dragElement);
       updateCount(column);       // new column count
        updateCount(sourceColumn);
               // new column count
          saveTaskInLocalStorage();
      column.classList.remove("hover-over")

})
}
addDragEventOnColumn(todo);
addDragEventOnColumn(progress);
addDragEventOnColumn(done)
/********************************************************************* */
let toggaleBtn = document.querySelector("#toggle-model");
let modal = document.querySelector(".modal");
let bgclass = document.querySelector(".bg")
let addtaskbtn = document.querySelector(".add-task-btn")

toggaleBtn.addEventListener("click",()=>{
    modal.classList.toggle("active");
})
bgclass.addEventListener("click",()=>{
    modal.classList.remove("active")
})

addtaskbtn.addEventListener("click",()=>{
    let titleInput = document.querySelector("#task-title-input");
    let decInput = document.querySelector("#task-dec-input");
    

     let tasktitleinput = titleInput.value;
    let taskdecinput = decInput.value;

    let storeTask = document.createElement("div")
       storeTask.className = "task";
    storeTask.draggable = true;

        storeTask.innerHTML = `
                 <h2>${tasktitleinput}</h2>
                 <p>${taskdecinput}</p>
                 <button class="btn delete-btn">Delete</button>
`;

/***************************************************************************** */
 let myDeleteBtn= storeTask.querySelector(".delete-btn");
 myDeleteBtn.addEventListener("click",()=>{
    let parentColumn = storeTask.parentElement;
    storeTask.remove()
    updateCount(parentColumn);
    saveTaskInLocalStorage()//save task in localstorage
 })

/************************************************************************** */

// drag logic
    storeTask.addEventListener("dragstart", ()=>{
        dragElement = storeTask;
    });

    // append immediately
    todo.append(storeTask);
    updateCount(todo); //update count
    saveTaskInLocalStorage();


    modal.classList.remove("active");
       
     // clear inputs
    titleInput.value = "";
    decInput.value = "";

    titleInput.focus()
})
/*************functionality for Update count************************************************** */
function updateCount(column){
    let count = column.querySelector(".right")
    let countNo = column.querySelectorAll(".task").length
  // count = countNo;
  if(countNo === 0){
    count.innerHTML = "count"
  }
  else{
    count.innerHTML = countNo
  }
 

}
updateCount(todo)
updateCount(progress)
updateCount(done)

//save task in LocalStorage
function saveTaskInLocalStorage(){
     const columns = document.querySelectorAll(".task-column");
    let data = {};//create object
    columns.forEach(mycolumnEle =>{
        const tasks = mycolumnEle.querySelectorAll(".task");
        data[mycolumnEle.id] =[];
        tasks.forEach(task =>{
            data[mycolumnEle.id].push({
                tittle:task.querySelector("h2").innerText,
                desc:task.querySelector("p").innerText
            });
        })
    })
    localStorage.setItem("kanbanData",JSON.stringify(data))

}

//load task from local storage 
//Storage se tasks wapas screen par lana.
function loadTasksFromLocalStorage(){

      let savedData = localStorage.getItem("kanbanData");

    // agar data hi nahi hai to function band
    if(savedData === null) return;

    let data = JSON.parse(savedData);

    loadTasksInColumn(todo, data.todo);
    loadTasksInColumn(progress, data.progress);
    loadTasksInColumn(done, data.done);
}
loadTasksFromLocalStorage()
//Task div dobara banana.
function loadTasksInColumn(column, tasks){

    if(!tasks) return;

    tasks.forEach(taskData => {

        let task = document.createElement("div");
        task.className = "task";
        task.draggable = true;

        task.innerHTML = `
            <h2>${taskData.tittle}</h2>
            <p>${taskData.desc}</p>
            <button class="btn delete-btn">Delete</button>
        `;

        // delete button
        task.querySelector(".delete-btn").addEventListener("click", ()=>{
            let parentColumn = task.parentElement;
            task.remove();
            updateCount(parentColumn);
            
        });

        // drag
        task.addEventListener("dragstart", ()=>{
            dragElement = task;
        });

        column.append(task);
    });

    updateCount(column);
}

/*Reload ke baad
HTML empty
↓
JS se new task create
↓
event listeners missing
↓
isliye dobara add karte hain
*/