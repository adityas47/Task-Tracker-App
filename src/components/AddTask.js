import { Button } from '@material-ui/core';
import {useState} from 'react'

const AddTask = ({onAdd}) => {
    const [text,setText]=useState('')
    const [day,setDay]=useState('')
    const [reminder,setReminder]=useState(false)


    const onSubmit=(e) =>{
        e.preventDefault()

        if(!text){
            alert("Please enter a task!");
            return
        }

        onAdd({text,day,reminder})

        setText('')
        setDay('')
        setReminder(false)


    }

    return (
        <form className="add-form" onSubmit={onSubmit}>
            <div className="form-control">
            <label>A New Task</label>
            <input type="text" placeholder="Enter task" value={text}
            onChange={(e)=>setText(e.target.value)}></input>
            </div >
            <div className="form-control">
            <label>Day and Time</label>
            <input type="text" placeholder="Enter day & time" value={day} onChange={(e)=>setDay(e.target.value)}></input>
            </div>
            <div className="form-control form-control-check">
            <label>Set Reminder</label>
            <input type="checkbox" checked={reminder} value={reminder} onChange={(e)=>setReminder(e)}></input>
            </div>
            <Button variant="outlined" color="turquoise" type="submit">SAVE</Button>



        </form>
    )
}

export default AddTask
