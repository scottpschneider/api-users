import vue from 'vue'
import vuex from 'vuex'
import axios from 'axios'
import router from '../router'

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
        setUserKeeps(state, keeps) {
            state.UserKeeps = keeps
        },
        setNewKeep(state, keep) {
            state.userKeeps.unshift(keep)
        },
        setTags(state, tags) {
            state.tags = tags
        },
        removeKeep(state, id){
            var i =state.userKeeps.findIndex(keep =>{
                return keep.id=id
            })
            state.userKeeps.splice(i, 1)
        },
        setKeep(state,keep){
            state.keep=keep
        },
        setActiveKeep(state,keep){
            state.activeKeep=keep
        },
        setVaults(state, vault) {
            state.vault = vault
        },
        setNewVault(state, vault){
            state.vaults.unshift(vault)
        },
        setActiveVault(state, vault){
            state.activeVault = Vault
        },
        removeVault(state, vault){
            var i = state.vaults.findIndex(v =>{
                return v.id == vault.id
            })
            state.vaults.splice(i, 1)
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

        getKeeps({ commit,dispatch }){
            server.get('/keep')
            .then(res =>{
                commit("setKeeps", res,data)
            })
            .catch(err =>{
                console.log(err)
            })
        },
        getVaultKeeps({ commit,dispatch }, id){
            server.get('/keep/vault/'+id)
            .then(res =>{
                commit("setUserKeeps", res.data)
            })
            .catch(err=>{
                console.log(err)
            })
        },
        getUserKeeps({ commit,dispatch,rootState }){
            server.get('/keep/user/'+ rootState.userModule.user.id)
            .then(res =>{
                commit("setUserKeeps", res.data)
            })
            .catch(err=>{
                console.log(err)
            })
        },
        createKeep({ commit, dispatch, rootState}, keep){
            keep.author = rootState.userModule.user.username
            server.post('/keep/' +keep.vaultId, keep)
            .then(res=>{
                commit("setNewKeep", res.data)
                server.post('/keep/tag/'+res.data.id, keep.tags)
                .then(res=>{
                    commit("setTags", res.data)
                })
                .catch(err =>{
                    console.log(err)
                })
            })
            .catch(err =>{
                console.log(err)
            })
        },
        deleteShare({ commit,dispatch }, share){
             server.delete('/keep/share/' +share.vaultId+ '/' +share.id)
             .then(res =>{
                 commit("removeKeep", share.id)
             })
             .catch(err =>{
                 console.log(err)
             })
        },
        activeKeep({ diapatch,commit }, keep){
            commit("setActiveKeep", keep)
        },
        editKeep({ commit, dispatch }, keep){
            server.put('/keep/' +keep.id, keep)
            .then(res =>{
                commit("setKeep", res.data)
            })
            .catch(err =>{
                console.log(err)
            })
        },
        selectKeep({ commit,dispatch }, keep){
            server.get('/keep/' +keep.id)
            .then(res =>{
                commit("setKeep", res.data)
                router.push({name: "Keep", params: {keepId: res.data.id}})
            })
            .catch(err =>{
                console.log(err)
            })
        },
        addShare({ commit, dispatch }, share){
            server.post("/keep/add/" +share.keepId, share)
            .then(res=>{
                console.log(res.data)
            })
            .catch(err =>{
                console.log(err)
            })
        },
        getTags({ commit, dispatch }, keepId){
            server.get('/keep/tags/' +keepId)
            .then(res =>{
                commit("setTags", res.data)
                dispatch("getRelated", res.data)
            })
            .catch(err =>{
                console.log(err)
            })
        },

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
                commit('setKeeps', keeps)
                router.push({name: 'SearchResults'})
            })
        },

        authenticate({ commit, dispatch }) {
            server.get('/account/authenticate')
            .then(res => {
                    commit('setUser', res.data)
                    dispatch("getVaults")
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
        getRelated({ dispatch, commit}, tags){
            server.post('/keep/query', tags)
            .then(res =>{
                commit("setKeeps", res.data)
            })
        },
        getVaults({ commit, dispatch, state }){
            server.get('/vault/author/' + state.user.id)
            .then(res =>{
                commit("setVaults", res.data)
            })
            .catch(err=>{
                console.log(err)
            })
        },
        getVaultList({ commit, dispatch, state }) {
            server.get('/api/vaultLists/' + state.user._id)
                .then(res => {
                    console.log(res)
                    commit('setVaultList', res.data)
                })
        },
        createVault({ commit, dispatch }, vault){
            server.post('/vault', vault)
            .then(res =>{
                commit("setNewVault", res.data)
            })
            .catch(err =>{
                console.log(err)
            })
        },
        setActiveVaultList({ commit, dispatch }, vaultList) {
            commit('setActiveVaultList', vaultList)
        },
        selectVault({ commit, dispatch, rootState }, vault){
            commit("setActiveVault", vault)
            dispatch("getVaultKeeps", vault.id)
            router.push({ name: 'Vault', params: {id: vault.id}})
        },
        deleteVault({ commit, dispatch }, vault){
            server.delete('/vault/' +vault.id)
            .then(res =>{
                commit("removeVault", res.data)
            })
            .catch(err =>{
                console.log(err)
            })
        },
        search({ dispatch, commit}, query){
            server.get('/keep/query/' +query)
            .then(res =>{
                commit("setKeeps", res.data)
            })
            .catch(err=>{
                console.log(err)
            })
        },
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


