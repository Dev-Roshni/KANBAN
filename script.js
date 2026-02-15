/********************for local storage *************/
let taskStoreLocal = {}

let todo = document.querySelector("#todo");
let progress = document.querySelector("#progress");
let done = document.querySelector("#done");

let dragelementselect = null;

if(localStorage.getItem("tasks")){
    const data = JSON.parse(localStorage.getItem("tasks"))

   // console.log(data)
    for(const col in data){
       // console.log(col ,data[col])
       const column = document.querySelector(`#${col}`);
       data[col].forEach(task =>{
        const div =document.createElement("div")
        div.classList.add("task")
        div.setAttribute("draggable","true");

        div.innerHTML =`  <h2>${task.title}</h2>
                 <p>${task.desc}</p>
                 <button class="btn delete-btn">Delete</button>
                ` 
                column.append(div)
               addDeleteFunction(div);

                div.addEventListener("drag",(e)=>{
                    dragElement = div;
                })
       })

    }
}

let tasks = document.querySelectorAll(".task");
tasks.forEach(mytask =>{
    mytask.addEventListener("drag",(event)=>{
         //console.log("dragging",event)
         dragelementselect = mytask;
    })

})

/*
progress.addEventListener("dragenter",(event)=>{
    // console.log("dragg aa gaya h column mai ",event)
    progress.classList.add("hover-over")
})
progress.addEventListener("dragleave",(event)=>{
     progress.classList.remove("hover-over")
})
*/
/*same for todo and done but iss tarike se code jayda repeatative baan jayega 
ek ki chij ko hum baar baar likh rhr honge so that we create function for this */

function dragingeventadd(myevent){
    myevent.addEventListener("dragenter",(e)=>{
        e.preventDefault();
         myevent.classList.add("hover-over");
    })
    myevent.addEventListener("dragleave",(e)=>{
        e.preventDefault();
        myevent.classList.remove("hover-over");

    })
    /**********dragover************************************** */
    /*iske through hum drag kiye hoye task ko dusre column mai drop kar sakte hai 
    browser kahi pe bhi element ko drop karne ka permission nahi deta h but through dragover
    hum kahi pe bhi element ko drop kar sakte hai */
    
    myevent.addEventListener("dragover",(e)=>{
         e.preventDefault()

    })

/***************************************************************** */
    myevent.addEventListener("drop",(e)=>{
       e.preventDefault();
       myevent.appendChild(dragelementselect);
      myevent.classList.remove("hover-over")

     updateCount()
    })

}
dragingeventadd(todo);
dragingeventadd(progress);
dragingeventadd(done);

/********************Updata count*************************************** */
function updateCount(){
    [todo,progress,done].forEach(col=>{
        const tasks = col.querySelectorAll(".task");
        const count = col.querySelector(".right");
/******************for local storage************************************* */
        taskStoreLocal[col.id] = Array.from (tasks).map((t) =>{
          return {
            title : t.querySelector("h2").innerHTML,
            desc : t.querySelector("p").innerHTML
          }
        })
       // console.log(taskStoreLocal)
       localStorage.setItem("tasks",JSON.stringify(taskStoreLocal))
/********************************************************** */
        count.innerHTML = tasks.length;
    });
}
//updateCount()

/*************************************************************************** */

let toggleModel = document.querySelector("#toggle-model")
let modal = document.querySelector(".modal")
let modalBg  =document.querySelector(".bg")
let addtaskbtn = document.querySelector(".add-task-btn")


toggleModel.addEventListener("click",()=>{
    modal.classList.toggle("active")
    console.log(" class add kar diya")

})
 modalBg.addEventListener("click",()=>{
    modal.classList.remove("active");
 })

 addtaskbtn.addEventListener("click",()=>{
     let mytaskinput = document.querySelector("#task-title-input").value;
     let mytextArea = document.querySelector("#task-dec-input").value;
     console.log(mytaskinput,mytextArea)

    let mynewAddTask =  document.createElement("div");

    mynewAddTask.classList.add("task")
    mynewAddTask.setAttribute("draggable","true");
      mynewAddTask.innerHTML = `
                 <h2>${mytaskinput}</h2>
                 <p>${mytextArea}</p>
                 <button class="btn delete-btn">Delete</button>
                ` 
               mynewAddTask.addEventListener("dragstart",()=>{
                     dragelementselect = mynewAddTask;
                     });             
                todo.append(mynewAddTask)

                addDeleteFunction(mynewAddTask);


                updateCount()

                modal.classList.remove("active")
 
 })
 
 function addDeleteFunction(taskElement) {
    const deleteBtn = taskElement.querySelector(".delete-btn");

    deleteBtn.addEventListener("click", () => {
        taskElement.remove();
        updateCount();
    });
}
