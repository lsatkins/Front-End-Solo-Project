import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {updateSearchList} from '../slices/searchSlice'
import '../css/home.css'

const Home = () => {

    const dispatch = useDispatch()


    const searchList = useSelector(state=>state.search.searches)
    console.log(searchList)
    const keys = Object.keys(searchList)
    console.log(keys)

    let today = new Date().toLocaleDateString()

    for(let key of keys){
        console.log(key)
        if(Object.keys(searchList).length && (searchList[key].date !== today)){
            dispatch(updateSearchList(key))
        }
    }

  return (
    <>

    <div className='backGround'>

        <img className='logo' style={{height: '50px'}}src="./images/jobtrackr-high-resolution-logo-white-on-transparent-background.png" alt="" />

    </div>
    
    
    </>
  )
}

export default Home
