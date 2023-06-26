import React from 'react';
import { NavLink, useLocation} from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';


function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	const location = useLocation()
	if(location.pathname === "/"){
		return null
	}
	return (
		<ul className='navbar'>
			<div className='navbar-left'>
				<li><NavLink exact to="/home"><img className="navbar-logo" src="https://cdn.discordapp.com/attachments/1117972822686433291/1122625429061259324/logo-black-removebg-preview-no-icon_2.png"/></NavLink></li>
			</div>
			<div className='navbar-right'>
			<li className="nav-links">
				<NavLink className="a-navlink" exact to="/home">Home</NavLink>
				<NavLink className="a-navlink" exact to=""onClick={(e)=>{
					e.preventDefault()
					alert("Feature coming soon...")}
				}>Leaderboards</NavLink>
				<NavLink className="a-navlink" exact to="/exercises">Exercises</NavLink>
				{/* <NavLink exact to=""onClick={(e)=>{
					e.preventDefault()
					alert("Feature coming soon...")}
				}>Profile</NavLink> */}
			</li>
			<li className="profile-button">
				{isLoaded && (
					<ProfileButton user={sessionUser} />
					)}
			</li>
			</div>
		</ul>
	);
}

export default Navigation;
