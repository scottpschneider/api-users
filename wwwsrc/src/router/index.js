import Vue from 'vue'
import vuex from 'vuex'
import axios from 'axios'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import SearchResults from '@/components/SearchResults'
import ProfilePage from '@/components/ProfilePage'
import Auth from '@/components/Auth'
import Favorites from '@/components/Favorites'


Vue.use(Router)

// var api <-- Guys, what is this?

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/SearchResults',
      name: 'SearchResults',
      component: SearchResults
    },
    {
    path: '/ProfilePage',
    name: 'ProfilePage',
    component: ProfilePage
    },
    {
      path: '/GeneralSearchResults',
      name: 'GeneralSearchResults',
      component: GeneralSearchResults
    },
    {
      path: '/Auth',
      name: 'Auth',
      component: Auth
    },
    {
      path: '/Favorites',
      name:'Favorites',
      component: Favorites
    },
    
  ]
})
