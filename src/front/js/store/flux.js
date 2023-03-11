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
				let response = await getActions().fetchProtected(`${apiUrl}/user`, {})
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
			let response = await getActions().fetchProtected(`${apiUrl}/logout`, {})
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
				body: JSON.stringify({ email: email, password: password, name:name, last_name:lastName })
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
				body: JSON.stringify({ email: email})
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

		fetchProtected: async (resourse, options) => {
			let response = await fetch(resourse, {
				...options,
				headers: {
					"Authorization": 'Bearer ' + getStore().accessToken
				}
			})
			if (!response.ok) {
				let msg = (await response.json()).msg
				if (msg == "Token has expired") {
					//Send Refresh Token to get new tokens
					console.log('Refreshing Token')
					response = await fetch(`${apiUrl}/refresh`, {
						headers: {
							'Authorization': 'Bearer ' + getStore().refreshToken
						}
					})
					//Check if there was an error getting new tokens
					if (!response.ok) {
						console.error('There was an error:' + response.statusText)
						return response
					}
					// if there was no error set new tokens in store and localStorage
					let data = await response.json()
					localStorage.setItem("accessToken", data.access_token)
					localStorage.setItem("refreshToken", data.refresh_token)
					setStore({ refreshToken: data.refresh_token, accessToken: data.access_token })
					//fetch again to the same resource with new tokens 
					return await fetch(resourse, {
						...options,
						headers: {
							"Authorization": 'Bearer ' + getStore().accessToken
						}
					})
				}
				return undefined
			}

			return response

		}



	}
}
}

export default getState;
