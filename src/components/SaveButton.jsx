import React from 'react'
import { saveJob, removeJob} from '../slices/searchSlice'
import Button from 'react-bootstrap/Button';
import {useDispatch, useSelector} from 'react-redux'

const SaveButton = ({saveItem}) => {

    const saved = useSelector((state)=> state.search.saved)
const dispatch = useDispatch()   //store.dispatch(fun)

const checkIfSaved = (obj) => {
    for(const item of saved){
        if(item.item.job_id === obj.job_id){
            return true;
        }  
    }
    return false
}

const findIndex = (obj) => {
    const index = saved.findIndex((item) => item.item.job_id === obj.job_id);
    return index;
  }

const handleSaveJob = (item) => {
    dispatch(saveJob(item))
  }
  const handleRemoveJob = (item) => {
    let index = findIndex(item)
    console.log('remove', index)
    dispatch(removeJob(index))
  }

  return (
    <>
    
    {checkIfSaved(saveItem) ? (
        <Button onClick={()=>handleRemoveJob(saveItem)} variant="danger">Remove</Button>):(
        <Button onClick={()=>handleSaveJob(saveItem)} variant="primary">Save</Button>    
    )}
    
    </>
  )
}

export default SaveButton
