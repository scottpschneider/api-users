import vue from 'vue'
import vuex from 'vuex'
import axios from 'axios'
import router from '../router'

vue.use(vuex)

var production = !window.location.host.includes('localhost');
var baseUrl = production ? '' : '//localhost:5000';

var auth = axios.create({
    baseURL: baseUrl + "/account/",
    timeout: 3000,
    withCredentials: true
})

var server = axios.create({
    baseURL: baseUrl + '/api',
    timeout: 3000,
    withCredentials: true
})

export default new vuex.Store({
    state: {
        user: {},
        keeps: [],
        activeKeep: {},
        userKeeps: [],
        vaults: [],
        favorites: [],
        vaultKeeps: [], 
        activeVault:{}
    },
    mutations: {
        deleteUser(state) {
            state.user = {}
        },
        setUser(state, user) {
            state.user = user
        },
        setKeeps(state, keeps) {
            state.keeps = keeps
            console.log(keeps)
        },
        setUserKeeps(state, keeps) {
            state.UserKeeps = keeps
        },
        setNewKeep(state, keep) {
            state.keeps.unshift(keep)
        },
        removeKeep(state, id) {
            var i = state.userKeeps.findIndex(keep => {
                return keep.id = id
            })
            state.userKeeps.splice(i, 1)
        },
        setActiveKeep(state, keep) {
            state.activeKeep = keep
        },
        setVaults(state, vaults) {
            state.vaults = vaults
        },
        setNewVault(state, vault) {
            state.vaults.unshift(vault)
        },
        setActiveVault(state, vaultId) {
            var vault = state.vaults.find(v=> v.id == vaultId)
            state.activeVault = vault
        },
        removeVault(state, vault) {
            var i = state.vaults.findIndex(v => {
                return v.id == vault.id
            })
            state.vaults.splice(i, 1)
        },
        setVaultKeeps(state, vaultkeeps) {
            state.vaultKeeps = vaultkeeps
        },
        setNewVaultKeep(state, vaultKeep) {
            state.vaultKeeps.unshift(vaultKeep)
        }
    },
    actions: {
        getKeeps({ commit, dispatch }) {
            server.get('/keep')
                .then(res => {
                    commit("setKeeps", res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        getVaultKeeps({ commit, dispatch }, id) {
            server.get('/vaultkeeps/' + id)
                .then(res => {
                    commit("setVaultKeeps", res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        createVaultKeep({ commit, dispatch }, vaultkeep) {
            server.post('/vaultkeeps', vaultkeep)
                .then(res => {
                    commit("setNewVaultKeep", res.data)
                })
                .catch(err => {
                    console.log(err)
                })
            //only send over vaultId, keepId, userId, what is in vaultkeep model, then go thru controller/repo
        },
        getUserKeeps({ commit, state }) {
            server.get('/keep/user/' + state.user.id)
                .then(res => {
                    commit("setUserKeeps", res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        createKeep({ commit, state }, keep) {
            keep.author = state.user.username
            server.post('/keep', keep)
                .then(res => {
                    commit("setNewKeep", res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        activeKeep({ commit }, keep) {
            commit("setActiveKeep", keep)
        },
        editKeep({ commit, dispatch }, keep) {
            server.put('/keep/' + keep.id, keep)
                .then(res => {
                    dispatch("getKeeps")
                })
                .catch(err => {
                    console.log(err)
                })
        },
        selectKeep({ commit }, keep) {
            server.get('/keep/' + keep.id)
                .then(res => {
                    commit("setKeeps", res.data)
                    router.push({ name: "Keep", params: { keepId: res.data.id } })
                })
                .catch(err => {
                    console.log(err)
                })
        },
        addShare({ commit, dispatch }, share) {
            server.post("/keep/add/" + share.keepId, share)
                .then(res => {
                    console.log(res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        addToVault({ commit, dispatch, state }, vaultItems) {
            server.put('/server/vaultLists/' + state.activeVaultList._id, vaultItems)
                .then(res => {
                    commit('setVaultList', res.data)
                })
        },
        addKeepToVault({ commit, dispatch }, keep){
            server.post('/vaultkeep', keep)
            .then(res=>{
                commit("setNewVaultKeep", res.data)
            })
            .catch(err=>{
                console.log(err)
            })
        },
        createVault({ commit, dispatch }, vault) {
            server.post('vault', vault)
                .then(res => {
                    commit("setNewVault", res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        getVaults({ commit, dispatch, state }) {
            server.get('vault/author/' + state.user.id)
                .then(res => {
                    commit("setVaults", res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        selectVault({ commit, dispatch }, vault) {
            commit("setActiveVault", vault)
        },
        selectedVault({ commit, dispatch }, ) {
            server.get('/vault/user/' + state)
        },
        deleteVault({ commit, dispatch }, vault) {
            server.delete('/vault/' + vault.id)
                .then(res => {
                    commit("removeVault", res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        deleteKeep({ commit, dispatch }, id) {
            server.delete('keep/' + id)
                .then(res => {
                    dispatch('getUserKeeps')
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
                    router.push({ name: 'Login' })
                })
        },
        register({ commit, dispatch }, userData) {
            auth.post('register', userData)
                .then(res => {
                    console.log("Registration Successful")
                    commit('setUser', res.data)
                    router.push({ name: 'HelloWorld' }) // I changed this to just change the component 
                })
        },
        authenticate({ commit, dispatch }) {
            auth.get('authenticate')
                .then(res => {
                    if (res.status == 200) {
                        commit('setUser', res.data)
                        dispatch("getVaults")
                        router.push({ name: 'HelloWorld' })
                    } else {
                        router.push({ name: 'Auth' })
                    }
                })
                .catch(res => {
                    console.log("auth error", res.data)
                })
        }
    }
})


