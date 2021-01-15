import styled from 'styled-components';

import { Button } from '@material-ui/core';

export const Container = styled.div`
	flex: 1;
	background-color: #fff;
`;

export const DivRow = styled.div`
	display: grid;
	grid-template-columns: 50% 50%;
	grid-gap: 10px;
	/* background-color: #2196f3; */
	padding: 10px;
`;

export const DivRow2 = styled.div`
	display: grid;
	grid-template-columns: auto auto auto;
	grid-gap: 10px;
	/* background-color: #f1f; */
	padding: 10px;
`;

export const Box = styled.div`
	/* background-color: #00f; */
	display: flex;
	justify-content: center;
	align-items: center;
	height: 40px;
`;

export const Box2 = styled.div`
	/* background-color: #00f; */
	display: flex;
	align-items: center;
	height: 40px;
`;

export const IsPrincialAtivo = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100px;
	height: 30px;
	border-radius: 20px;
	background-color: #c8ffa5;
	align-items: center;
`;

export const AtivoOn = styled.a`
	color: #307436;
	font-weight: bold;
`;

export const AtivoOff = styled.a`
	color: #fff;
	font-weight: bold;
`;

export const IsPrincialPausado = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100px;
	height: 30px;
	border-radius: 20px;
	background-color: #ffd2a5;
	align-items: center;
`;

export const PausadoOn = styled.a`
	color: #744d30;
	font-weight: bold;
`;

export const PausadoOff = styled.a`
	color: #fff;
	font-weight: bold;
`;

export const IsAtivoOn = styled(Button)`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100px;
	height: 30px;
	border-radius: 5px;
	background-color: #c8ffa5;
	align-items: center;
`;

export const IsAtivoOff = styled(Button)`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100px;
	height: 30px;
	border-radius: 5px;
	background-color: #ececec;
	align-items: center;
	&:hover {
		background-color: #c8ffa5;
		color: white;
	}
`;

export const IsPausadoOn = styled(Button)`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100px;
	height: 30px;
	border-radius: 5px;
	background-color: #ffd2a5;
	align-items: center;
`;

export const IsPausadoOff = styled(Button)`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100px;
	height: 30px;
	border-radius: 5px;
	background-color: #ececec;
	align-items: center;
	&:hover {
		background-color: #ffd2a5;
		color: #744d30;
	}
`;

export const Link = styled.a`
	color: #4287f5;
	font-weight: bold;
	text-decoration-line: underline;
`;

export const URL = styled.p`
	color: #5f5f5f;
	font-weight: bold;
`;

export const Title = styled.p`
	color: #5f5f5f;
	font-weight: bold;
`;

export const ButtonAct = styled.div`
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 150px;
	height: 40px;
	border-radius: 3px;
	background-color: #4287f5;
	align-items: center;
	color: #fff;
	transition: 0.5s all ease-out;
	&:hover {
		background-color: #1268f2;
		color: white;
	}
`;

export const Header = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	height: 60px;
	background-color: #fff;
	padding: 10px;
`;

export const TitleHeader = styled.p`
	color: #5f5f5f;
	font-size: 28px;
	font-weight: bold;
`;
