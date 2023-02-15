const apiUrl = process.env.BACKEND_URL+"/api"

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(apiUrl + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},

			getUserInfo: async()=>{
				let response = await fetch(apiUrl+'/user')
				if(!response.ok){
					console.error('There was an error:'+ response.statusText)
				}
				let data = await response.json()
				setStore({userInfo : 'data'})
			}, 

			login : async(email, password)=>{
				let response = fetch(apiUrl+'/login',{
					method : 'POST',
					headers : {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({ email, password })
				})
				if(!response.ok){
					console.error('There was an error:'+(await response).statusText)
					return false
				}

				setStore({ refreshToken: data.refreshToken, accessToken: data.accessToken })
				localStorage.setItem("accessToken", data.accessToken)
				localStorage.setItem("refreshToken", data.refreshToken)
				return true

			},

			signIn : async()=>{
				
			}


		}
	};
};

export default getState;
