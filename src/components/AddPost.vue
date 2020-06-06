<template>
  <div class="add-post container z-depth-1">
    <h2 class="center-align indigo-text">Add New Post Recipe</h2>
    <form @submit.prevent="addPost">
      <div class="field title">
        <label for="title">Post title:</label>
        <input type="text" name="title" v-model="title">
      </div>
      <div v-for="(ing,index) in ings" :key = "index" class ="field">
        <label for="ing">ing {{index+1}}:</label>
        <input type="text" name="ing" v-model="ings[index]">    
        <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
      </div>
      <div class="field add-ing">
        <label for="add-ing">Add an ingredient:</label>
        <input type="text" name="add-ing" @keydown.tab.prevent="addIng" v-model="another">
      </div>
      <div class="field center-align">
        <button class="btn pink">Add Post</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'
export default {
  name: 'AddPost',
  data(){
    return{
      title: null,
      another : null ,
      ings: [] , 
      slug :null
    }
  },
  methods: {
    addPost(){
        if(this.title){
            this.slug = slugify(this.title , {
                replacement :'-' , 
                remove: /[$*_+~.()'"!\-:@]/g,
                 lower: true
            }) 
            db.collection('posts').add({
                title :this.title,
                ings : this.ings , 
                slug : this.slug
            }).then(()=>{
                this.$router.push({name:'Index'})
            })
        }
    }
    , 
    addIng(){
        if(this.another){
            this.ings.push(this.another)
            this.another = null
        }
    } 
    ,
    deleteIng(ingToDelete){
        this.ings = this.ings.filter(ing=>{
            return ing != ingToDelete 
        })
    }
  }
}
</script>

<style>
.add-post{
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
.add-post h2{
  font-size: 2em;
  margin: 20px auto;
}
.add-post .field{
  margin: 20px auto;
  position: relative;
}

.add-post .delete{
     position: absolute;
     right : 0px ; 
     bottom: 16px;
     color: #aaa;
     font-size: 1.4em;
     cursor: pointer;
}
</style>
