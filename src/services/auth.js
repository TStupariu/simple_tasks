import { auth } from './firebase'

const register = (email, pass) => {
	auth.createUserWithEmailAndPassword(email, password).catch((error) => {
  	var errorCode = error.code
  	var errorMessage = error.message
  	console.error(`${errorCode} : ${errorMessage}`)
	});
}