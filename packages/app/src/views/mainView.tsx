import styled from 'styled-components'
import Posts from '../components/Posts' 

const StyledMain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: #1E1E1E;
`

function Main() {
  return (
   <StyledMain>
   <Posts />
   </StyledMain>
  )
}

export default Main
