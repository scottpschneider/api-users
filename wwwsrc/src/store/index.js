import vue from 'vue'
import vuex from 'vuex'
import axios from 'axios'
import router from "../router"

vue.use(vuex)

var production = !window.location.host.includes('localhost');
var baseUrl = production ? '//herokuapp.com/' : '//localhost:5000';
//var keeprApi = ''

var auth = axios.create({
    baseURL: baseUrl + "/account",
    timeout: 3000,
    withCredentials: true
})

export default new vuex.Store({
    state: {
        user: {},
        keeps: {},
        vaults: {},
        favorites: [],        
    
    },
    mutations: {
        deleteUser (state){
            state.user = {}
        },
        setUser(state, user) {
            state.user = user
        },
        setKeeps(state, keeps) {
            console.log(keeps)
            state.keeps = keeps
        },
        setVault(state, vault) {
            state.vault = vault
        },
        setFavorites(state, favorites){
            console.log(favorites)
            state.favorites = favorites
        },
        
    },

    actions: {

        // getSearchIngredients({dispatch, commit}, query) {
        //     ingredientRecipeSearch.get(query + '&number=10'+ '&limitLicense=false' + '&ranking=1')
        //     .then(res=>{ 
        //         console.log(res)
        //         var ingRecipes = res.data.map(recipe => {
        //             return {
        //                 title: recipe.title,
        //                 image: recipe.image,

        //                 spoonId: recipe.id
        //             }
        //         })
        //         commit('setIngRecipes', ingRecipes)
        //     })
        // },
    },
//AUTH STUFF
login({ commit, dispatch }, loginCredentials) {
    auth.post('/login', loginCredentials)
        .then(res => {
            console.log("successfully logged in!")
            commit('setUser', res.data)
            router.push({ name: 'HelloWorld' })
        })
},
logout({ commit, dispatch }) {
    auth.delete('/logout')
        .then(res => {
            console.log("Successfully logged out!")
            commit('deleteUser')
            //   router.push({name: 'Login'})
        })
},
register({ commit, dispatch }, userData) {
    auth.post('/register', userData)
        .then(res => {
            console.log("Registration Successful")
            router.push({ name: 'HelloWorld' }) // I changed this to just change the component 
        })
},
authenticate({ commit, dispatch }) {
    api.get('/authenticate')
        .then(res => {
            commit('setUser', res.data)
            // router.push({ name: 'HelloWorld' })
        })
        .catch(res => {
            console.log(res.data)
        })
},

})


