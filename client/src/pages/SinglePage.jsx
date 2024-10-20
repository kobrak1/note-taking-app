import React from 'react'
import { useSelector, useDispatch } from "react-redux"
import { increment, decrement, reset} from "../features/counter/counterSlice"

const SinglePage = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  console.log('count:', count)
  
  return (
    <div className='flex flex-col justify-center w-full'>
      <span className='flex justify-center'>Number: {count}</span>
      <button onClick={() => dispatch(increment())} className='flex justify-center w-[100px] bg-slate-500 hover:bg-slate-600 active:bg-slate-700 text-white p-1 mt-2 mx-auto rounded-md cursor-pointer'>+</button>
      <button onClick={() => dispatch(decrement())} className='flex justify-center w-[100px] bg-slate-500 hover:bg-slate-600 active:bg-slate-700 text-white p-1 mt-2 mx-auto rounded-md cursor-pointer'>-</button>
      <button onClick={() => dispatch(reset())} className='flex justify-center w-[100px] bg-slate-500 hover:bg-slate-600 active:bg-slate-700 text-white p-1 mt-2 mx-auto rounded-md cursor-pointer'>reset</button>
    </div>
  )
}

export default SinglePage
