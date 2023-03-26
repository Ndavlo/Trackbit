import { json } from "react-router-dom"

const apiUrl = process.env.BACKEND_URL + "/api"

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			refreshToken: null,
			accessToken: null,
			newSteps: [],
			habits: [],
			steps: [],
		},
		actions: {
			loadTokens: () => {
				let accessToken = localStorage.getItem('accessToken') || ''
				let refreshToken = localStorage.getItem('refreshToken') || ''
				// console.log(accessToken)
				setStore({ refreshToken: refreshToken, accessToken: accessToken })
			},

			getUserInfo: async () => {
				let response = await fetchProtected(`${apiUrl}/user`, {})
				let data = await response.json()
				setStore({ userInfo: data })
				return undefined
			},

			updateUserInfo: async (title, bio) => {
				let response = await fetchProtected(`${apiUrl}/user`, {
					method: 'PATCH',
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({ title: title, bio: bio })
				})
				if (!response.ok) {
					console.error('No se pudo actualizar')
					return false
				} else {
					let newUserInfo = { ...getStore().userInfo }
					newUserInfo.bio = bio
					newUserInfo.title = title
					setStore({ userInfo: newUserInfo })
					return "ok"
				}

			},

			login: async (email, password) => {

				let response = await fetch(apiUrl + '/login', {
					method: 'POST',
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({ email: email, password: password })
				})
				if (!response.ok) {
					console.error('There was an error2:' + (await response).statusText)
					return false
				}
				let data = await response.json()

				localStorage.setItem("accessToken", data.access_token)
				localStorage.setItem("refreshToken", data.refresh_token)
				setStore({ refreshToken: data.refresh_token, accessToken: data.access_token })
				return true

			},


			resetPassword: async (token, newPassword) => {
				let resp = await fetch(apiUrl + "/api/resetpassword", {
					method: "POST",
					body: JSON.stringify({
						password: newPassword
					}),
					headers: {
						"Content-Type": "application/json",
						"Authorization": "Bearer " + token
					}
				})
				if (!resp.ok) {
					console.error(resp.statusText)
					return "Error en la recuperacion"
				}
				return "ok"
			},


			logOut: async () => {
				let response = await fetchProtected(`${apiUrl}/logout`, {})
				localStorage.removeItem("accessToken")
				localStorage.removeItem("refreshToken")
				setStore({ refreshToken: '', accessToken: '' })
			},



			signUp: async (email, password, name, lastName) => {
				const resp = await fetch(apiUrl + '/signup', {
					method: 'POST',
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({ email: email, password: password, name: name, last_name: lastName })
				})
				if (!resp.ok) {
					console.error("There was an error: " + resp.statusText)
					const data = await resp.json()
					console.log(data)
					return data.msg
				}
				const data = await resp.json()
				console.log(data)
				return true
			},

			subscribeToNews: async (email) => {
				const resp = await fetch(apiUrl + '/newslettersub', {
					method: 'POST',
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({ email: email })
				})
				if (!resp.ok) {
					console.error("There was an error: " + resp.statusText)
					const data = await resp.json()
					console.log(data)
					return true
				}
			},


			getEvents: async () => {
				const resp = await fetchProtected(`${apiUrl}/events`,
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							beginning_date: "2022-12-31",
							ending_date: "2023-12-31"
						})
					}
				)

				if (!resp.ok) {
					console.error("Algo paso fetching the resource")
					return
				}

				const data = await resp.json()
				setStore({ events: data })
			},

			addReport: async (time, stepId) => {
				await fetchProtected(`${apiUrl}/report`, {
					method: 'POST',
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({ time, stepId })
				})
				getActions().getReports()
			},

			addHabit: async (name, description, steps) => {
				await fetchProtected(`${apiUrl}/rutina`, {
					method: 'POST',
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({ name, description, steps })
				})
				getActions().getHabits()
			},

			deleteHabit: async (id) => {
				await fetchProtected(`${apiUrl}/rutina/${id}`, {
					method: 'DELETE'
				})
				getActions().getHabits()
			},

			getHabits: async () => {
				const response = await fetchProtected(`${apiUrl}/rutinas`)
				if (!response.ok) return
				const data = await response.json()
				setStore({ habits: data })
				getActions().getSteps()
			},

			getSteps: async () => {
				const response = await fetchProtected(`${apiUrl}/steps`)
				const data = await response.json()
				setStore({ steps: data })
			},

			setNewStepInStore: (index, data) => {
				let newSteps = getStore().newSteps
				newSteps[index] = data
				setStore({ newSteps: newSteps })
			},

			pushNewStepInStore: () => {
				let newSteps = getStore().newSteps
				//default values for a new step
				newSteps.push({
					name: 'Paso',
					description: 'Descripcion',
					content: 'Contenido',
					repetition: '1',
					interval: 'D',
					startDate: '',
					endDate: '',
					time: '00:00:00'
				})
				setStore({ newSteps: newSteps })

			},
			setNewStepProperty: (index, propertyName, value) => {
				let newSteps = getStore().newSteps
				let step = newSteps[index]
				step[propertyName] = value
				newSteps[index] = step
				setStore({ newSteps: newSteps })

			},
			deleteNewStepFromStore: (index) => {
				let newSteps = getStore().newSteps
				newSteps.splice(index, 1)
				actions.setNewStepInStore({ newSteps: newSteps })
			},

			clearNewsSteps: () => {
				setStore({ newSteps: [] })
			},

			setTaskDone: async (taskId, value) => {
				await fetchProtected(`${apiUrl}/task`, {
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						task_id: taskId,
						value: value
					})
				})
				getActions().getEvents()
			},

			setHAbitColor: async (habitId, color) => {
				const response = await fetchProtected(`${apiUrl}/habit`, {
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(
						{
							'color': color,
							'habit_id': habitId
						}
					)

				})

			},




		},



	}


	async function fetchProtected(resource = '', options = {}) {
		const { headers, ...opt } = options
		let response = await fetch(resource = resource, options = {
			...opt,
			headers: {
				...headers,
				"Authorization": 'Bearer ' + getStore().accessToken
			}
		})
		if (!response.ok) {
			const msg = (await response.json()).msg
			if (msg == "Token has expired") {
				console.log('refreshing token')
				response = await fetch(`${apiUrl}/refresh`, {
					headers: {
						"Authorization": 'Bearer ' + getStore().refreshToken
					}
				})
				if (!response.ok) {
					return response.statusText
				}
				let data = await response.json()
				setStore({ refreshToken: data.refresh_token, accessToken: data.access_token })
				localStorage.setItem("accessToken", data.access_token)
				localStorage.setItem("refreshToken", data.refresh_token)
				fetchProtected(resource, options)
			}
		} else {
			return response
		}
	}
}




export default getState;
