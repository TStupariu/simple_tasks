import { auth } from '../firebase'

export const register = async (email, pass) => {
	try {
		return await auth.createUserWithEmailAndPassword(email, pass)
	}
	catch(error) {
  	console.error(`${error.code} : ${error.message}`)
	}
}

export const login = async (email, pass) => {
	try {
		return await auth.signInWithEmailAndPassword(email, pass)
	}
	catch(error) {
  	console.error(`${error.code} : ${error.message}`)
	}
}

export const setToken = (token) => {
	localStorage.setItem('auth_token', JSON.stringify(token))
}

export const getToken = () => {
	return JSON.parse(localStorage.getItem('auth_token'))
}

export const getUid = () => {
	const token = getToken()
	return token.uid
}