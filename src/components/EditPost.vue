<template>
    <div v-if="post" class="edit-post container z-depth-1">
    <h2 class="indigo-text center-align">Edit {{ post.title }} post</h2>
    <form @submit.prevent="editPost">
      <div class="field title">
        <label for="title">post title:</label>
        <input type="text" name="title" v-model="post.title">
      </div>
      <div v-for="(ing, index) in post.ings" class="field ing" :key="index">
        <label for="ing">ing:</label>
        <input type="text" name="ing" v-model="post.ings[index]">
        <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
      </div>
      <div class="field add-ing">
        <label for="add-ing">Add an ing (press tab to add):</label>
        <input type="text" name="add-ing" @keydown.tab.prevent="addIng" v-model="another">
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{ feedback }}</p>
        <button class="btn pink">Update post</button>
      </div>
    </form>
  </div>
</template>

<script>

import db from '@/firebase/init'
import slugify from 'slugify'

export default {
    name : "EditPost" , 
    data(){
        return{
            post: null,
            another: null,
            feedback: null,
            slug: null
        }
    }, 
    created(){
        let ref = db.collection ('posts').where('slug' , '==' ,this.$route.params.post_slug)
        ref.get().then(snapshot=>{
            snapshot.forEach(doc => {
                this.post =doc.data() 
                this.post.id = doc.id 
            });
        })
    }
    ,
    methods:{
        
        editPost(){
            if(this.post.title){
                this.slug = slugify(this.post.title, {
                    replacement: '-',
                    remove: /[$*_+~.()'"!\-:@]/g,
                    lower: true
                })
            }
    
            // update post in firestore
            db.collection('posts').doc(this.post.id).update({
            title: this.post.title,
            slug: this.slug,
            ings: this.post.ings
            }).then(() => {
            this.$router.push({ name: 'Index' })
            }).catch(err => {
            console.log(err)
            })
        }
        ,
        addIng(){
        if(this.another){
            this.post.ings.push(this.another)
            this.another = null
            this.feedback = null
        } else {
            this.feedback = 'You must enter a value to add another ings'
        }
        },
        deleteIng(ingToDelete){
            
        this.post.ings = this.post.ings.filter(ing => {
            return ing != ingToDelete
        })
        }
    }
}
</script>

<style >
.edit-post{
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
.edit-post h2{
  font-size: 2em;
  margin: 20px auto;
}
.edit-post .field{
  margin: 20px auto;
  position: relative;
}
.edit-post .delete{
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}
</style>