import React from 'react'
import {useSelector} from 'react-redux'
import {sortStatus} from '../functions'
import TaskCard from './TaskCard'
import '../css/tasks.css'


const Tasks = () => {

    const saved = useSelector(state=>state.search.saved)

  return (
    <>
    
        <div className="row">
            <div className="col-4">
                <h1 className="text-center title">Saved</h1>
                <ul className="d-flex flex-column align-items-center">
                    {sortStatus('Saved', saved).map(item=>(
                        <TaskCard obj={item}/>
                    ))}
                </ul>
            </div>
            <div className="col-4">
                <h1 className="text-center title">Applied</h1>
                <ul className="d-flex flex-column align-items-center">
                    {sortStatus('Applied', saved).map(item=>(
                        <TaskCard obj={item}/>
                    ))}
                </ul>     
            </div>
            <div className="col-4">
                <h1 className="text-center title">Interviewed</h1>
                <ul className="d-flex flex-column align-items-center">
                    {sortStatus('Interviewed', saved).map(item=>(
                        <TaskCard obj={item}/>
                    ))}
                </ul>
            </div>
        </div>
    
    </>
  )
}

export default Tasks
