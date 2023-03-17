const apiUrl = process.env.BACKEND_URL + "/api"

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			refreshToken: null,
			accessToken: null
		},
		actions: {
			loadTokens: () => {
				console.log('loading tokens')
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


			getRegistries: () => {

				let today = new Date()
				const oneDay = 86400000
				const oneWeek = oneDay * 7
				today.setHours(0, 0, 0, 0)
				let registries = []
				for (let i = 0; i < 67; i++) {
					registries.push(
						{
							date: new Date(today.getTime() - i * oneDay),
							registries: [
								{
									time: Date.now(),
									habit: 1,
									level: 0.5,
								}
							]
						}
					)
				}
				console.log(registries)
				setStore({ registries: registries })
			},

			addRegitry: () => {
				getActions().fetchProtected(`${apiUrl}/activity`)

			},

			addHabit: (name, description, steps) => {
				fetchProtected(`${apiUrl}/nueva_rutina`, {
					method: 'POST',
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({ name , description, steps})
				})
			},

			getHabits: () => {
				fetchProtected(`${apiUrl}/habits`)
			}

		}
	}



	async function fetchProtected(resource = '', options = {}) {
		console.log('fetching protected')
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
