import { FC } from "react";
import styled from "styled-components";

const StyledImage = styled.img`
	width: 100%;
	height: 100%;
	object-fit: contain;
`;
const StyledImageContainer = styled.div`
	max-width: 100%;
	width: 500px;
	height: 300px;
	background: rgb(68 68 68 / 25%);
	border-radius: 0.5rem;
`;

interface ImageProps {
	src: string;
	alt: string;
	fallback?: string;
}

const Image: FC<ImageProps> = ({ src, alt, fallback }) => {
	const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
		e.currentTarget.src = fallback;
	};
	return (
		<StyledImageContainer>
			<StyledImage src={src} alt={alt} onError={handleError} />
		</StyledImageContainer>
	);
};

export default Image;
