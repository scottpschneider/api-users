import vue from 'vue'
import vuex from 'vuex'
import axios from 'axios'
import router from "../router"

vue.use(vuex)

var production = !window.location.host.includes('localhost');
var baseUrl = production ? '//keeprweb-api.herokuapp.com/' : '//localhost:5000';

var keepSearch = axios.create({
    headers: {
        "X-Mashape-Key" : "WUU1lLesMimshTMLlxjAtkQGQMk6p1JQPB5jsnLPJCHfNJbugE"
    },
    baseURL: '//keeprweb-api.herokuapp.com' + '/search?query=',
    timeout: 3000
})

var auth = axios.create({
    baseURL: baseUrl + "/account",
    timeout: 3000,
    withCredentials: true
})

var server = axios.create({
    baseURL: baseUrl,
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
        deleteUser(state) {
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
        setVaultKeeps(state, vaultkeeps) {
            state.vaultkeeps = vaultkeeps
        },

        setFavorites(state, favorites) {
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
        getSearchResults({dispatch, commit}, query) {
            keepSearch.get(query)
            .then(res=>{
                var keeps = res.data.results.map(keep => {
                    return {
                        name: keep.name,
                        description: keep.description,
                        userId: user.id
                    }
                })
                console.log(res)
                commit('setRecipes', recipes)
                router.push({name: 'GeneralSearchResults'})
            })
        },

        authenticate({ commit, dispatch }) {
            server.get('/authenticate')
                .then(res => {
                    commit('setUser', res.data)
                    // router.push({ name: 'HelloWorld' })
                })
                .catch(res => {
                    console.log(res.data)
                })
        },

        postKeep({ commit, dispatch }, keepItem) {
            server.post('/api/keepLists', keepItem)
                .then(res => {
                    dispatch("getKeeps")
                })
                .catch(res => {
                    alert("err")
                })
        },
        addToFavorites({ commit, dispatch, state }, keep) {
            server.post('/keeps', recipe)
                .then(res => {
                    commit('setKeeps', res.data)
                })
        },
        getFavorites({ commit, dispatch, state }) {
            server.get('/keeps')
                .then(res => {
                    console.log(res)
                    commit('setFavorites', res.data.favorites)
                })
        },
        addToVault({ commit, dispatch, state }, VaultItems) {
            server.put('/server/vaultLists/' + state.activeVaultList._id, vaultItems)
                .then(res => {
                    commit('setVaultList', res.data)
                })
        },
        addVaultList({ commit, dispatch, state }, newTitle) {
            var newList = {
                title: newTitle,
                userId: state.user._id
            }
            server.post('/api/vaultLists/', newList)
                .then(res => {
                    console.log(res)
                    commit('setVaultList', res.data.items)
                })
        },
        getVaultList({ commit, dispatch, state }) {
            server.get('/api/vaultLists/' + state.user._id)
                .then(res => {
                    console.log(res)
                    commit('setVaultList', res.data)
                })
        },
        setActiveVaultList({ commit, dispatch }, vaultList) {
            commit('setActiveVaultList', vaultList)
        },
        // deleteFavorite({ commit, dispatch }) {
        //     api.delete('/favorites/:id')
        //         .then(res => {
        //             console.log("Successfully deleted favorite!")
        //             commit('deleteFavorite')

        //         })
        // },
        deleteFavorite({ commit, dispatch }, id) {
            server.delete('/favorites/' + id)
                .then(res => {
                    dispatch('getFavorites')
                })
        },
        deleteKeep({ commit, dispatch }, id) {
            server.delete('/api/keepLists/' + id)
                .then(res => {
                    dispatch('getGroceryList')
                })
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
        // authenticate({ commit, dispatch }) {
        //     server.get('/authenticate')
        //         .then(res => {
        //             commit('setUser', res.data)
        //             // router.push({ name: 'HelloWorld' })
        //         })
        //         .catch(res => {
        //             console.log(res.data)
        //         })

    }
})


