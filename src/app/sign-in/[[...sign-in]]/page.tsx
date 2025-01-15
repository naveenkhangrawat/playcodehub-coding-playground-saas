import React from 'react'
import { SignIn } from '@clerk/nextjs'



function SignInPage() {

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div>
        <SignIn />
      </div>
    </div>
)}

export default SignInPage;