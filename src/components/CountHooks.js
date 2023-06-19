import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
// import {increment, decrement, incrementByNum, reset} from '../actions/incrementCount'
import {increment, decrement} from '../slices/combinedSlice'

const CountHooks = () => {

  const count = useSelector(state => state.counter.count) // count is mapped from global state
  const dispatch = useDispatch()   //store.dispatch(fun)

  
  
  return (
    <>
      
      <h2>{count}</h2>

      <button onClick={()=>dispatch(increment())}>Increment</button>
      <button onClick={()=>dispatch(decrement())}>Decrement</button>
      
      



    </>
  )
}

export default CountHooks
