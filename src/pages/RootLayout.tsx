import { Outlet } from "react-router-dom"
import "../styles/pageStyles/RootLayout.css"
import Sidebar from "../components/Sidebar"

const RootLayout = () => {
  return (
    <div className="div-rootlayout">
      <p className="msg-smalldisplay">Please view the Web App on Large Screen</p>
        <div className="content-rootlayout">

        <Sidebar/>
        <Outlet/>

        </div>

    </div>
  )
}

export default RootLayout