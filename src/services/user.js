import { db } from '../firebase'

export const registerUserInDb = (uid) => {
	db.ref('/users').update({uid: 'adasd'})
}