import { db } from '../firebase'
import { getUid } from './auth'

export const addTask = (task) => {
	const uid = getUid()
	db.ref(`/users/${uid}/tasks`).push({title: task})
}