import React,{useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {sortStatus} from '../functions'
import TaskCard from './TaskCard'


const Tasks = () => {

    const saved = useSelector(state=>state.search.saved)

  return (
    <>
    
        <div className="row">
            <div className="col-4">
                <ul>
                    {sortStatus('saved', saved).map(item=>(
                        <TaskCard obj={item}/>
                    ))}
                </ul>
            </div>
            <div className="col-4"></div>
            <div className="col-4"></div>
        </div>
    
    </>
  )
}

export default Tasks
