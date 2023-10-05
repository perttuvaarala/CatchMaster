import styled from 'styled-components'
import { Outlet, NavLink} from 'react-router-dom'

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`
const StyledNav = styled.div`
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    height: 3.5rem;
    align-items: center;
    justify-content: center;
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
    <StyledNav>
      <NavLink to={"/"}><u>Home</u></NavLink>
      <NavLink to={"/map"}><u>Map</u></NavLink>
      <NavLink to={"/weather"}><u>Weather</u></NavLink>
      <NavLink to={"/profile"}><u>Profile</u></NavLink>
    </StyledNav>
    <div style={{backgroundColor:"white"}}>
        <Outlet />
    </div>
    <StyledFooter>Group 2</StyledFooter>
   </StyledRoot>
  )
}

export default Root
