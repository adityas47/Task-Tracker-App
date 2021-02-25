import { useState , useEffect } from 'react'
import {BrowserRouter as Router,Route} from 'react-router-dom'
import {Alert} from 'react-alert'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import About from './components/About'
import Footer from './components/Footer'

function App() {
  const [showAddTask,setshowAddTask]=useState(false)
  const [tasks,setTasks]=useState([])

  useEffect(()=>{
    const getTasks=async()=>{
      const tasksFromServer=await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  },[])

  //fetching tasks from server

  const fetchTasks= async()=>{
    const res=await fetch('http://localhost:5000/tasks')
   const data=await res.json()
    return data
  }

  //fetching a single task
  const fetchTask= async(id)=>{
    const res=await fetch(`http://localhost:5000/tasks/${id}`)
    const data=await res.json()
    return data
  }




//Adding tasks

const addTask = async(task)=>{
  const res= await fetch('http://localhost:5000/tasks',{
    method:'POST',
    headers:{
      'Content-type':'application/json',
    },
    body:JSON.stringify(task)
  }) 
  const data=await res.json() 
  console.log(data);
  setTasks([...tasks,data])


  // const id=Math.floor(Math.random()*1000)+1
  // const newTask={id, ...task}
  // setTasks([...tasks, newTask])

}

//deleting tasks

const deleteTask = async(id)=>{
  await fetch(`http://localhost:5000/tasks/${id}`,
  {
    method:'DELETE',
  })

  setTasks(tasks.filter((task)=>task.id!==id))
}

//set reminders

const toggleReminder =async(id)=>{
  const taskToToggle= await fetchTask(id)
  const updatedTask={...taskToToggle,reminder:!taskToToggle.reminder}

  const res=await fetch(`http://localhost:5000/tasks/${id}` , {
    method:'PUT',
    headers:{
      'Content-type':'application/json'
    },
    body:JSON.stringify(updatedTask)
  })

  const data=await res.json()


  alert("You have set a reminder to this task");
  setTasks(tasks.map((task)=>task.id===id ? {...task,reminder:data.reminder} : task))
}

  return (
    <Router>
    <div className="container">
      <Header onAdd={()=>setshowAddTask(!showAddTask)} showAdd={showAddTask}/>
      
      
      <Route path="/" exact render={(props)=>(
        <>
          {showAddTask && <AddTask onAdd={addTask}/>}<br/>
          <hr/><br/>
          { tasks.length>0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/ > : <p>NO TASKS SCHEDULED!</p>}
          <Footer />
        </>
      )}></Route>
      <Route path="/about" component={About}></Route>
      
    </div>
    </Router>
  );
}


export default App;
