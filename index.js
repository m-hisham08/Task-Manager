const taskForm = document.querySelector('.task-form');
//const submitBtn = document.querySelector('submit-btn');
const taskInput = document.querySelector('task-input');
const formAlert = document.querySelector('form-alert');
//const tasksContainer = document.querySelector('.tasks-container');
const loadingDOM = document.querySelector('.loading-text');
const tasksDOM = document.querySelector('.tasks')

const showTasks = async () => {
    loadingDOM.style.visibility = 'visible';

    try {
        const { data: { tasks } } = await axios.get('api/v1/tasks');

        if (tasks.length < 1){
            tasksDOM.innerHTML = '<h5>Add a new task to get started!</h5>';
            loadingDOM.style.visibility = 'hidden'; 
            return
        }

        const allTasks = tasks.map((task) => {
            const {name, completed, _id:taskID} = task;
            return `<div class="single-task ${completed && 'task-completed'}">
            <h5><span><i class="far fa-check-circle"></i></span>${name}</h5>
            <div class="task-links">
            
            
            
            <!-- edit link -->
            <a href="task.html?id=${taskID}"  class="edit-link">
            <i class="fas fa-edit"></i>
            </a>
            <!-- delete btn -->
            <button type="button" class="delete-btn" data-id="${taskID}">
            <i class="fas fa-trash"></i>
            </button>
            </div>
            </div>` 
        }).join('');

        tasksDOM = allTasks;
    } catch (error) {
        console.log(error);
        tasksDOM.innerHTML = '<h5>Error, please try again later!</h5>';
    }
    loadingDOM.style.visibility = 'hidden';
}

showTasks();

tasksDOM.addEventListener('click', async (e) => {
    const targetElement = e.target

    if(targetElement.parentElement.classList.contains('.delete-btn')){
        loadingDOM.style.visibility = 'visible';
        const id = targetElement.parentElement.dataset.id;

        try {
            await axios.delete(`/api/v1/tasks/${id}`);
            showTasks();
        } catch (error) {
            console.log(error);
            loadingDOM.style.visibility = 'hidden';
        }
        loadingDOM.style.visibility = 'hidden';
    }
})



taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = taskInput.value;

    try {
        await axios.post('/api/v1/tasks', { name });
        showTasks();

        taskInput.value = ''
        formAlert.style.display = 'block'
        formAlert.textContent = `success, task added`
        formAlert.classList.add('text-success')
    } catch (error) {
        formAlert.style.display = 'block'
        formAlert.innerHTML = `error, please try again`
    }
    setTimeout(() => {
        formAlert.style.display = 'none'
        formAlert.classList.remove('text-success')
      }, 3000);
})