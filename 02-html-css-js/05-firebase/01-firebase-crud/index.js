import {saveTask,getTasks,onGetTasks,deleteTask,getTask,updateTask} from  './firebase.js'

const taskForm=document.getElementById('task-form')
const tasksContainer = document.getElementById('tasks-container')

let editStatus = false;
let id= ''

window.addEventListener('DOMContentLoaded',async () =>{
      // getTask:void
  const  querySnapshot=  await getTasks()

  onGetTasks((querySnapshot) =>{

    // let html = ''
    //* para resetear los campos a que impriman uno
    tasksContainer.innerHTML =''
    querySnapshot.forEach(doc => {
      // console.log(doc)


      const task = doc.data()
      // console.log(doc.id);
  
      tasksContainer.innerHTML +=`
      <div class="card card-body mt-2 border-primary">
        <h3 class="h5">${task.title}</h3>
        <p>${task.description}</p>
        <div>
          <button class="btn btn-primary btn-delete" data-id="${doc.id}">Delete</button>
          <button class="btn btn-secondary btn-edit" data-id="${doc.id}">Edit</button></div>
      </div>
  
  `;

    })
    
    //* tasksContainer.innerHTML = html
    // console.log(tasksContainer);

    const btnDelete=tasksContainer.querySelectorAll('.btn-delete')

    btnDelete.forEach(btn =>{
      btn.addEventListener('click',({target: { dataset }})=>{
        // console.log('delete');
        // console.log(dataset.id);

        deleteTask(dataset.id)
      })
    })


    const btnEdit=tasksContainer.querySelectorAll('.btn-edit')
    btnEdit.forEach((btn) => {
      // console.log(btn);
      btn.addEventListener('click',async (e) =>{
        // console.log(e.target.dataset.id)
      
        const doc=await getTask(e.target.dataset.id)
        // console.log(doc.data());
        const task = doc.data()

        taskForm['task-title'].value = task.title
        taskForm['task-description'].value = task.description

        editStatus = true
        id = doc.id

        //*  de  taskforn se va aseleccionar el btn-task-save
        taskForm['btn-task-save'].innerText = 'Update'

      })
    })

  })
})


taskForm.addEventListener('submit',(e)=>{
  e.preventDefault()
  // console.log('submitted');

  const title=taskForm['task-title'];
  const description=taskForm['task-description']

  // console.log(title.value,description.value);

  if(!editStatus){
    // console.log('updating')
    saveTask(title.value, description.value)
  }else{
    updateTask(id,{
      title:title.value,
      description:description.value})

    editStatus = false
  }

  taskForm.reset( )
})