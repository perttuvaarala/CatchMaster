import { FC, useState } from "react";
import styled from "styled-components";

const StyledImage = styled.img`
	width: 100%;
	height: 100%;
	object-fit: contain;
	cursor: pointer; /* Add cursor style to indicate it's clickable */
`;

const StyledImageContainer = styled.div`
	max-width: 100%;
	width: 500px;
	height: 300px;
	background: rgb(68 68 68 / 25%);
	border-radius: 0.5rem;
`;

const ImagePopup = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	background: rgba(0, 0, 0, 0.8);
	z-index: 999;
`;

const ImagePopupContent = styled.div`
	max-width: 80%;
	max-height: 80%;
`;

interface ImageProps {
	src: string;
	alt: string;
	fallback: string;
}

const Image: FC<ImageProps> = ({ src, alt, fallback }) => {
	const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
		e.currentTarget.src = fallback;
	};

	const [isImagePopupOpen, setImagePopupOpen] = useState(false);

	const openImagePopup = () => {
		setImagePopupOpen(true);
	};

	const closeImagePopup = () => {
		setImagePopupOpen(false);
	};

	return (
		<>
			<StyledImageContainer onClick={openImagePopup}>
				<StyledImage src={src} alt={alt} onError={handleError} />
			</StyledImageContainer>

			{isImagePopupOpen && (
				<ImagePopup onClick={closeImagePopup}>
					<ImagePopupContent>
						<StyledImage src={src} />
					</ImagePopupContent>
				</ImagePopup>
			)}
		</>
	);
};

export default Image;
