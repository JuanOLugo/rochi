import React, { createContext, useState } from 'react'

export const storecontext = createContext()

function StoreContexProvider({children}) {

    const [STORE, setSTORE] = useState(null)

  return (
    <storecontext.Provider value={{STORE,setSTORE}}>
        {children}
    </storecontext.Provider>
  )
}

export default StoreContexProvider