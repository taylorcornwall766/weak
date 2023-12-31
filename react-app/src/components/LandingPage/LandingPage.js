import LoginFormModal from "../LoginFormModal"
import SignupFormPage from "../SignupFormPage"
import OpenModalButton from "../OpenModalButton"
import {useHistory, NavLink} from 'react-router-dom'
import { login } from "../../store/session"
import { useDispatch, useSelector } from "react-redux"
import * as sessionActions from "../../store/session"
import "./Landingpage.css"
function LandingPage(){
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector((state)=> state.session.user)
    if (user){
        history.push("/home")
    }
    const demoLogin = async() =>{
        await dispatch(sessionActions.login("bobbie@aa.io", "password"))
        return history.push("/home")
    }
    return (
        <div className="landingpage container">
            <img className="logo" src="https://cdn.discordapp.com/attachments/1117972822686433291/1122216607800889345/logo-black-removebg-preview.png"></img>
            <div className="signup container">
            <SignupFormPage></SignupFormPage>
            </div>
            <OpenModalButton
            className='login-button'
            buttonText='Already have an account? Log in'
            modalComponent={<LoginFormModal/>}
            />
            <button className="demo" onClick={demoLogin}>
                Demo Login
            </button>
        </div>
    )
}

export default LandingPage
