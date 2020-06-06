import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import AddPost from '@/components/AddPost'
import EditPost from '@/components/EditPost'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    }
    ,
    {
      path :'/add-post', 
      name : 'AddPost' ,
      component : AddPost 
    }
    ,
    {
      path :'/edit-post/:post_slug' , 
      name :'EditPost' , 
      component : EditPost 
    }
  ]
})
