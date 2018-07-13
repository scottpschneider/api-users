<template>
  <div class="container-fluid d-flex justify-content-center">

<div v-if="!logister">
      <form @submit.prevent="login">
        <input type="text" placeholder="Email" v-model="log.email">
        <input type="password" v-model="log.password">
        <button type="submit">login</button>
      </form>
      <p @click="regLog">No username? Register here</p>
    </div>
   <div v-else>  

     <form @submit.prevent="userRegister" >
       <input type="text" placeholder="Email" v-model="newUser.email">
       <input type="text" placeholder="userName" v-model="newUser.userName">
       <input type="password" placeholder="password" v-model="newUser.password">
       <button type="submit">Register</button>
      </form>
      <p @click="regLog">Currently a user? Straight to Login!</p>
   </div>

  </div>
</template>

<script>
  export default {
    name: 'auth',
    mounted(){
this.$store.dispatch('authenticate')
    },
    data() {
      return {
        logister: false,
        log:{
          email: '',
          password: '',
        },
        newUser:{
          userName: '',
          email: '',
          password: '',
        }

      }
    },
    computed: {
     currentUser(){
        return this.$store.state.user
      }
},
    methods: {
        login(){
        this.$store.dispatch('login', this.log)
      },
      userRegister(){
        this.$store.dispatch('register', this.newUser)
        this.$store.dispatch('login', this.newUser)
      },
      regLog(){ //toggle between register and login
        this.logister = !this.logister
      }
    }
  }

</script>

<style>

.container-fluid{
  background: #98f321;
  background-size:cover;
  margin: 0px;
   height: 100%;
   width: 100%;
  
}

html { 
  background: rgb(144, 186, 241); 
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

</style>
