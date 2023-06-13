import LoginFormModal from "../LoginFormModal"
import SignupFormPage from "../SignupFormPage"
import OpenModalButton from "../OpenModalButton"
import {useHistory, NavLink} from 'react-router-dom'
import { login } from "../../store/session"
import { useDispatch, useSelector } from "react-redux"
import * as sessionActions from "../../store/session"
function HomePage(){
    const dispatch = useDispatch()
    const history = useHistory()
    const demoLogin = async() =>{
        await dispatch(sessionActions.login("demo@aa.io", "password"))
        return history.push("/home")
    }
    const user = useSelector((state) => state.session.user)
    if(!user){
        history.push("/")
    }
    return (
        <div className="homepage container">
            <h1>LOGO</h1>
        </div>
    )
}

export default HomePage
