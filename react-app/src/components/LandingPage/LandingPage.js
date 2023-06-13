import LoginFormModal from "../LoginFormModal"
import SignupFormPage from "../SignupFormPage"
import OpenModalButton from "../OpenModalButton"
import {useHistory, NavLink} from 'react-router-dom'
import { login } from "../../store/session"
import { useDispatch } from "react-redux"
import * as sessionActions from "../../store/session"
function LandingPage(){
    const dispatch = useDispatch()
    const history = useHistory()

    const demoLogin = async() =>{
        await dispatch(sessionActions.login("bobbie@aa.io", "password"))
        return history.push("/home")
    }
    return (
        <div className="landingpage container">
            <h1>LOGO</h1>
            <div className="signup container">
            <SignupFormPage></SignupFormPage>
            </div>
            <OpenModalButton
            className='login-button'
            buttonText='Already have an account? Log in'
            modalComponent={<LoginFormModal/>}
            />
            <button onClick={demoLogin}>
                Demo Login
            </button>
        </div>
    )
}

export default LandingPage
