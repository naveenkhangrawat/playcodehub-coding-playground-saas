"use client"

import { UserButton } from '@clerk/nextjs'
import { User } from 'lucide-react'
import React from 'react'

function UserProfileBtn() {
    return (
        <UserButton>
            <UserButton.MenuItems>
                <UserButton.Link 
                    label='Profile' 
                    labelIcon={<User className='size-4'/>}
                    href='/dashboard'
                />
            </UserButton.MenuItems>
        </UserButton>
    )
}

export default UserProfileBtn