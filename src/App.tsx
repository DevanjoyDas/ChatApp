import {lazy} from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ChatProvider from './context/chatContext'

import { init } from '@instantdb/react';

const APP_ID = '4b256d41-4b9f-490c-956f-d59cd253b484';

export const db = init({ appId: APP_ID});


const Default = lazy(()=>import("./pages/Default"))
const Chat = lazy(()=>import("./pages/Chat"))
const RootLayout = lazy(()=>import("./pages/RootLayout"))

function App() { 


  return (
    <BrowserRouter>
    <ChatProvider>
        <Routes>
        <Route element={<RootLayout/>}>

          <Route path='/' element={<Default/>}/>
          <Route path='/:chatId' element={<Chat/>}/>

        </Route>
        </Routes>

        </ChatProvider>
    </BrowserRouter>
    
  )
}

export default App
