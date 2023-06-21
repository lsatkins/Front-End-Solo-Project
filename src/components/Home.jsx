import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {updateSearchList} from '../slices/searchSlice'

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
    
    
    </>
  )
}

export default Home
