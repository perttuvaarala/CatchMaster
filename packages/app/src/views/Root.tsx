
import styled from 'styled-components'

import { Outlet, NavLink } from 'react-router-dom'

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`
const StyledNav = styled.div`
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
`

function Root() {

  return (
   <StyledRoot>
    <StyledNav>
      <NavLink to={"/"}>hima</NavLink>
      <NavLink to={"/map"}>kartta</NavLink>
    </StyledNav>
    <div>
        <Outlet />
    </div>
   </StyledRoot>
  )
}

export default Root
