import React, { createContext, useContext, useReducer } from "react";

// Create the user context
const userContext = createContext();
function useUser() {
	return useContext(userContext);
}
// Define the initial state for the user context
const initialState = {
	user: {},
	isLoggedIn: false,
	role: "guest",
};

// Define the reducer for the user context
const reducer = (state, action) => {
	switch (action.type) {
		case "LOGIN":
			// Return the updated state when a user logs in
			return {
				isLoggedIn: true,
				user: action.payload.user,
				role: action.payload.user.role,
			};
		case "LOGOUT":
			// Return the initial state when a user logs out
			return initialState;
		default:
			// Return the existing state if the action type is not recognized
			return state;
	}
};

// Define a higher-order component that wraps the root component of your application
// and provides the user context and reducer to all child components
function UserProvider({ children }) {
	// Use the useReducer hook to create a "user" state variable
	// and a function to update it called "dispatch"
	const [user, dispatch] = useReducer(reducer, initialState);

	// Return the user context provider, passing the user state and dispatch function
	// as the value for the context
	return (
		<userContext.Provider
			value={{
				user,
				setLogin: (user) => dispatch({ type: "LOGIN", payload: user }),
				setLogout: () => dispatch({ type: "Logout" }),
			}}>
			{children}
		</userContext.Provider>
	);
}

export { userContext, UserProvider, useUser };
