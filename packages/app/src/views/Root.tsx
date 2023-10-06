import styled from 'styled-components'
import { Outlet, NavLink} from 'react-router-dom'
import '../Link.css';
import logo from '../assets/catchmaster-logo.png' 


const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`
const StyledNav = styled.div`
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    height: 5.5rem;
    align-items: center;
    width:100%;
    background-color: #D8FBB8;
    
`

const StyledFooter = styled.div`
    height: 2rem;
    background-color: #192113;
    color: white;
    text-align: center;
    padding: 0.5rem;
    bottom: 0;
`

function Root() {
  
  return (
    
   <StyledRoot>
    <link href='https://fonts.googleapis.com/css?family=Advent Pro' rel='stylesheet'></link>
    
    <StyledNav>
      <div className='wrap'>
    <div className='logo'>
      <img src={logo}  alt="CatchMaster logo" width="80%" height="100%"></img>
    </div>
    <div className='head'>CatchMaster</div>
    </div>
    <div className='nav'>
      <NavLink className="nav-link" to={"/"}><u>Home</u></NavLink>
      <NavLink className="nav-link" to={"/map"}><u>Map</u></NavLink>
      <NavLink className="nav-link" to={"/weather"}><u>Weather</u></NavLink>
      <NavLink className="nav-link" to={"/profile"}><u>Profile</u></NavLink>
      </div>
    </StyledNav>
   
    <div style={{backgroundColor:"white"}}>
        <Outlet />
    </div>
    <StyledFooter>Group 2</StyledFooter>
   </StyledRoot>
  )
}

export default Root
