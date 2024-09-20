import React, { useEffect, useState } from 'react'

const Test = () => {
  const [num, setNum] = useState(0)
  const [message, setMessage] = useState('')


  useEffect(() =>{
    //console.log('invoked')
    fetch('http://localhost:5000/')
            .then(res => res.json())
            .then(res => {
                console.log(res)
                setMessage(res.message)
            })
  }, [])
    return (
        <div>
            <div>Test {message}</div>
            <div>Test {num}</div>
            <button onClick={() => setNum(num + 1)}>increment</button>
        </div>
  )
}

export default Test