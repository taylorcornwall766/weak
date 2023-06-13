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
		<ul>
			<li>
				<NavLink exact to="/home">Home</NavLink>
				<NavLink exact to="/leaderboards">Leaderboards</NavLink>
				<NavLink exact to="/exercises">Exercises</NavLink>
				<NavLink exact to="/profile">Profile</NavLink>
			</li>
			{isLoaded && (
				<li>
					<ProfileButton user={sessionUser} />
				</li>
			)}
		</ul>
	);
}

export default Navigation;
