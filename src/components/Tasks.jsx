import React,{useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {sortStatus} from '../functions'
import TaskCard from './TaskCard'
import '../css/tasks.css'


const Tasks = () => {

    const saved = useSelector(state=>state.search.saved)

    const [isSmallScreen, setIsSmallScreen] = useState(false);


    useEffect(() => {
        const handleResize = () => {
          setIsSmallScreen(window.innerWidth < 980); // Update the state based on the screen width
        };
    
        handleResize(); // Call the function initially
    
        window.addEventListener('resize', handleResize); // Listen for window resize events
    
        return () => {
          window.removeEventListener('resize', handleResize); // Clean up the event listener
        };
      }, []);

  return (
    <>
        <div className="row justify-content-center">
            <div className={`${isSmallScreen ? 'row' : 'col-4 ps-0'}`}>
                <h1 className="text-center title">Saved</h1>
                <ul className="p-0 d-flex flex-column align-items-center">
                    {sortStatus('Saved', saved).map(item=>(
                        <TaskCard obj={item}/>
                    ))}
                </ul>
            </div>
            <div className={`${isSmallScreen ? 'row' : 'col-4'}`}>
                <h1 className="text-center title">Applied</h1>
                <ul className="p-0 d-flex flex-column align-items-center">
                    {sortStatus('Applied', saved).map(item=>(
                        <TaskCard obj={item}/>
                    ))}
                </ul>     
            </div>
            <div className={`${isSmallScreen ? 'row' : 'col-4 pe-0'}`}>
                <h1 className="text-center title">Interviewed</h1>
                <ul className="p-0 d-flex flex-column align-items-center">
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
