import styled from "styled-components";

const StyleBox = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #48412f;
    text-align: center;
    padding: 2rem;
    height: 40rem;
`;

const StyleSpan = styled.span`
    margin-right: 10px;
`;


function About() {
    return (
        <StyleBox>
            <h1>About</h1>
            <p>
            Welcome to Catchmaster, your ultimate fishing companion!
            We understand that fishing isn't just a hobby; it's a passion, a way of life. 
            Our app is designed to unite anglers from all walks of life, creating a vibrant community where you can share your fishing triumphs with fellow enthusiasts. 
            Whether you've reeled in a trophy-sized bass, a colorful trout, or a feisty marlin, Catchmaster is your platform to showcase your prized catches. 
            With a photo and a few words to capture the moment, you can connect with like-minded individuals, learn new techniques, and celebrate the thrill of the catch together. 
            Join us at Catchmaster, just log in easily with your Google account and start sharing your fishing adventures today!
            </p>
            <p>Our group is composed of the following members:</p>
            <ul>
            <div>
                    <StyleSpan>Adnan Avni</StyleSpan>
                    <a href="https://www.instagram.com/adnanavni">
                        <img width="20" height="20" src="https://img.icons8.com/ios/50/instagram-new--v1.png" alt="instagram-new--v1"/>
                    </a>
                    <a href="https://github.com/adnanavni">
                        <img width="20" height="20" src="https://img.icons8.com/material-outlined/24/github.png" alt="github"/>
                    </a>
                </div>
                
                <div>
                    <StyleSpan>Perttu Vaarala</StyleSpan>
                    <a href="https://www.instagram.com/perttuvaarala/">
                        <img width="20" height="20" src="https://img.icons8.com/ios/50/instagram-new--v1.png" alt="instagram-new--v1"/>
                    </a>
                    <a href="https://github.com/perttuvaarala">
                        <img width="20" height="20" src="https://img.icons8.com/material-outlined/24/github.png" alt="github"/>
                    </a>
                </div>

                <div>
                    <StyleSpan>Henri Vuento</StyleSpan>
                    <a href="https://www.instagram.com/henqqz/">
                        <img width="20" height="20" src="https://img.icons8.com/ios/50/instagram-new--v1.png" alt="instagram-new--v1"/>
                    </a>
                    <a href="https://github.com/moikonna">
                        <img width="20" height="20" src="https://img.icons8.com/material-outlined/24/github.png" alt="github"/>
                    </a>
                </div>

                <div>
                    <StyleSpan>Roope Kylli</StyleSpan>
                    <a href="https://www.instagram.com/roopek_">
                        <img width="20" height="20" src="https://img.icons8.com/ios/50/instagram-new--v1.png" alt="instagram-new--v1"/>
                    </a>
                    <a href="https://github.com/roopeky">
                        <img width="20" height="20" src="https://img.icons8.com/material-outlined/24/github.png" alt="github"/>
                    </a>
                </div>
            </ul>
            <p>Catchmaster was made in Web Development 2 course at Metropolia University of Applied Sciences by Group 2</p>
        </StyleBox>
    )
}

export default About;