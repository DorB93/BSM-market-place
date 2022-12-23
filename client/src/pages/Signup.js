import React, { useState } from "react";

import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import { SubmitBtn } from "./Login";
import { useUser } from "./../context/UserContext";
import MessageAlert from "../components/MessageAlert";
import { API_URL } from "../helper";

export const PageContainer = styled.section`
	height: 80%;
	width: 80%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 20px;
	position: relative;
`;
export const Form = styled.form`
	background-color: #dfdfdf8f;
	box-shadow: 2px 2px 5px 5px rgba(128, 128, 128, 0.193);
	height: 80%;
	width: 455px;
	display: flex;
	flex-direction: column;
	align-items: center;
	border-radius: 12px;
	gap: 15px;
	padding: 15px;
`;
export const InputContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 80%;

	& label {
		color: black;
	}

	& input {
		width: 180px;
		border: 0;
		border-radius: 12px;
		padding: 10px;
		box-shadow: 1px 1px 5px 2px rgba(128, 128, 128, 0.193);
	}
	& input[type="checkbox"] {
		width: 20px;
		padding: 10px;
		border-radius: 50%;
		background-color: transparent;
	}
	& input:focus {
		border: 0.5 solid lightgray;
	}
`;
async function signupUser(userData) {
	return fetch(`${API_URL}users/signup`, {
		method: "POST",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(userData),
	}).then((data) => data.json());
}

function Signup() {
	const { setLogin } = useUser();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [role, setRole] = useState("user");
	const [message, setMessage] = useState(null);
	const [alertType, setAlertType] = useState(null);
	const navigate = useNavigate();

	function wait(sec) {
		return setTimeout(() => {
			console.log(`Waiting ${sec} seconds...`);
		}, 1000 * sec);
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		setMessage(null);
		if (password !== passwordConfirm) {
			setMessage("Password & Password Confirm must match! try again!");
			return;
		}
		const user = await signupUser({
			role,
			passwordConfirm,
			name,
			email,
			password,
		});
		if (user.status === "success") {
			setAlertType(user.status);
			setMessage(user.message);
			setLogin(user.data);
			await wait(5);
			navigate("/");
		} else {
			setAlertType(user.status);
			setMessage(user.message);
		}
	};
	return (
		<>
			<PageContainer>
				{message && <MessageAlert message={message} type={alertType} />}
				<Form onSubmit={handleSubmit}>
					<h1>Create an Account</h1>
					<InputContainer>
						<label htmlFor='name'>Full Name:</label>
						<input
							placeholder='Enter your full name'
							type='text'
							onChange={(e) => {
								setName(e.target.value);
							}}
							required
						/>
					</InputContainer>
					<InputContainer>
						<label htmlFor='email'>Email:</label>
						<input
							placeholder='yourmail@example.com'
							type='email'
							onChange={(e) => {
								setEmail(e.target.value);
							}}
							required
						/>
					</InputContainer>
					<InputContainer>
						<label htmlFor='password'>Password:</label>
						<input
							minLength={8}
							placeholder='shh-secret'
							type='password'
							onChange={(e) => {
								setPassword(e.target.value);
							}}
							required
						/>
					</InputContainer>
					<InputContainer>
						<label htmlFor='passwordConfirm'>Password Confirm:</label>
						<input
							minLength={8}
							placeholder='shh-secret'
							type='password'
							onChange={(e) => {
								setPasswordConfirm(e.target.value);
							}}
							required
						/>
					</InputContainer>
					<InputContainer>
						<label htmlFor='role'>Want to join our sellers family?</label>
						<input
							type='checkbox'
							onChange={(e) => {
								console.log(e);
								if (e.target.checked) {
									setRole("seller");
								} else {
									setRole("user");
								}
							}}
						/>
					</InputContainer>
					<InputContainer>
						<SubmitBtn type='reset'>Reset</SubmitBtn>
						<SubmitBtn type='submit'>Submit</SubmitBtn>
					</InputContainer>
				</Form>
				<p>
					Already have an account? <NavLink to='/login'>click here</NavLink>
				</p>
			</PageContainer>
		</>
	);
}

export default Signup;
