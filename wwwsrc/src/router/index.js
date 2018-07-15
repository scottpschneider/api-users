import Vue from 'vue'
import vuex from 'vuex'
import axios from 'axios'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ProfilePage from '@/components/ProfilePage'
import Auth from '@/components/Auth'
import Favorites from '@/components/Favorites'
import Vault from '@/components/Vault'
import Keep from '@/components/Keep'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/ProfilePage',
      name: 'ProfilePage',
      component: ProfilePage
    },
    {
      path: '/Auth',
      name: 'Auth',
      component: Auth
    },
    {
      path: '/Favorites',
      name: 'Favorites',
      component: Favorites
    },
    {
      path: '/vault/:id',
      name: 'Vault',
      component: Vault
    },
    {
      path: '/keep/:keepId',
      name: 'Keep',
      component: Keep
    },
  ]
})
