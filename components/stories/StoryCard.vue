<template>
   <div class="card story-card">
      <header class="card-header">
         <p class="card-header-title">
            <img class="image is-32x32 story-card__preview-image" src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
            <span> 
              <router-link :to="{ path: `/stories/${story.id}` }">
                  {{story.title}} 
              </router-link>              
                by 
              <router-link :to="{ path: `/users/${story.creator.id}` }">
                  {{story.creator.username}}
              </router-link>
            </span>
         </p>
         <a href="#" class="card-header-icon" aria-label="more options">
            <span class="icon">
               <i class="fa fa-star fa-lg" v-if="is_a_favourite" aria-hidden="true"></i>
               <i class="fa fa-star-o fa-lg" v-else aria-hidden="true"></i>
            </span>
         </a>
      </header>
      <div class="card-content">
         <div class="content">
            <div class="story-card__content__info has-text-black-bis has-text-weight-semibold is-size-6">
               <span> Genre(s): 
                  <router-link 
                     v-for="genre of story.genres" :key="genre.name"
                     :to="{ path: `/stories?s=genre:${genre.name}` }"
                  >
                     {{ genre.name }},
                  </router-link>
               </span>
               <span> Chapters: 
                  <router-link 
                     :to="{ path: `/stories/${story.id}/chapters` }">
                     {{story.chapters.length}} 
                  </router-link>                     
               </span>
               <span> Language: 
                  <router-link 
                     :to="{ path: `/stories?s=lang:${story.language}` }">
                     {{story.language}}
                  </router-link>
               </span>
            </div>
            
            
            <div class="story-card__description">
               Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
            </div>

            <div class="story-card__tags-container">
               
               <span class="tags">
                  <router-link 
                     v-for="tag of story.tags" :key="tag.name"
                     :to="{ path: `/stories?s=tags:${tag.name}` }"
                     class="tag"
                  >
                     #{{ tag.name }}
                  </router-link>
               </span>
            </div>
            
            <div class="story-card__content__info has-text-right is-size-7">
               <span>
                  <time datetime="2016-1-1">Last Update: 3rd April, 2016</time>
               </span>
               <span>
                  <time datetime="2016-1-1">Published: 1st January, 2016</time>   
               </span>
               <span>
                  Likes : 64
               </span>
            </div>
         </div>
      </div>
         
         
   </div>
</template>

<script>
export default {
  props :["storyId"],
  computed : {
     story(){
        //TODO: remove this
        const placeholderStory = {
           id: 12,
           title : "Story Title",
           creator : {
              id: 134,
              name : "Bob Newman"
           },
           genres : [ 
               {name: "Horror"}, {name: "Adventure"}, {name: "Comedy"}
           ],
           chapters : [{},{},{},{},{},{},{}],
           language: "English",
           tags : [
              { name : "torture"}, { name : "murder"}, { name : "closed circle"}
           ]
        }
        let story = this.$store.state.stories.map[this.storyId];
        return Object.assign({},placeholderStory,story);
     },
     is_a_favourite(){
        return true;
     }
  }
}
</script>

<style>
   .story-card {
      margin-bottom:20px;
   }
   .story-card__preview-image {
      margin-right:10px;
   }

   .story-card__description{
      margin-top:1rem;
      margin-bottom:1rem;
   }

   .story-card__tags-container > span {
      display: inline-block;
      margin-right:5px;
   }

   .story-card__content__info > span:not(:first-child) {
      margin-right: 4px; 
      margin-left: 4px; 
   }
   .story-card__content__info > span:first-child {
      margin-right: 4px; 
   }
   .story-card__content__info > span:not(:first-child):before {
      content:" | ";
      margin-right: 8px;
   }
</style>

