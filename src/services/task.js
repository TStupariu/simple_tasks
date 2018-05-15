import { db } from '../firebase'
import { getUid } from './auth'

export const addTask = (task) => {
	const uid = getUid()
	db.ref(`/users/${uid}/tasks/wip`).push({title: task})
}

export const setAsDone = (task) => {
	const uid = getUid()
	db.ref(`/users/${uid}/tasks/wip`).child(task.key).remove()
	db.ref(`/users/${uid}/tasks/done/${task.key}`).set({title: task.item.title})
}

export const deleteTask = (task) => {
	const uid = getUid()
	db.ref(`/users/${uid}/tasks/wip`).child(task.key).remove()
}