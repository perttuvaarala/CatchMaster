import styled from "styled-components";

const StyleProfile = styled.div`
  display: flex;
  flex-direction: column;
  background-color:#48412F;
  align-items: center;
  padding: 2rem;
  height: 40rem;
`;

function ProfileView() {
	return (
    <StyleProfile>
        Profile
    </StyleProfile>
    )
    ;
}

export default ProfileView;
