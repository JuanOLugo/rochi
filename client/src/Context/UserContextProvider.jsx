import React, {createContext, useState } from 'react'

export const userContext = createContext()

function UserContextProvider({children}) {

    const [USER, setUSER] = useState(null)

  return (
    <userContext.Provider value={{
        USER, setUSER
    }}>
        {children}
    </userContext.Provider>
  )
}

export default UserContextProvider