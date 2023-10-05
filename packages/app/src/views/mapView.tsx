import styled from 'styled-components'
import Map from '../components/Map';

const StyledMap = styled.div`
  display: flex;
  flex-direction: column;
  background-color:#48412F;
  align-items: center;
  padding: 2rem;
  height: 40rem;
`

function MapView() {
  return (
  <StyledMap>
    <Map />
  </StyledMap>
  );
}

export default MapView
