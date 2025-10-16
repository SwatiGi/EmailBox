import React from 'react'
import SignUp from './components/SignUp'

import Email from './components/Email'
import Navbar from './components/Navbar'
import EmailData from './components/EmailData'

const App = () => {
  return (
    <div>
      {/* <SignUp/> */}
      <Navbar />
      <Email/>
      <EmailData/>
    </div>
  )
}

export default App
