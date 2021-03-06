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
	background-color: #2196f3;
	padding: 10px;
`;

export const DivRow2 = styled.div`
	display: grid;
	grid-template-columns: auto auto auto;
	grid-gap: 10px;
	/* background-color: #f1f; */
	padding: 10px;
`;

export const BoxStyled = styled.div`
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

export const IsPrincial = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 150px;
	height: 40px;
	border-radius: 3px;
	background-color: #32cd32;
	align-items: center;
	color: #fff;
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

export const ButtonColor = styled(Button)`
	width: auto;
	margin-top: 15px;
	height: 30px;
	background-color: #4287f5;
	color: white;
	&:hover {
		background-color: #275193;
		color: white;
	}
`;
