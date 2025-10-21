import React from 'react'
import SignUp from './components/SignUp'

import Email from './components/Email'
import Navbar from './components/Navbar'
import EmailData from './components/EmailData'
import UseFetch from './components/useFetch'
import useFetch from './components/useFetch'

const App = () => {
  // let data = useFetch('https://jsonplaceholder.typicode.com/posts')
  // console.log("posts",data)
  // let todo = useFetch('https://jsonplaceholder.typicode.com/todos')
  // console.log("todos",todo)
  return (
    <div>
      {/* <SignUp/> */}
      <Navbar />
      <Email/>
      <EmailData/>
      {/* <UseFetch/> */}
    </div>
  )
}

export default App
