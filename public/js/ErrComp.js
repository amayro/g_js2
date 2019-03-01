Vue.component('error', {
   data(){
       return {
           isVisible: this.text !== '',
           text: ''
       }
   },
   template: `
   <div class="error-block" v-if="isVisible">
    <p class="error-msg">
    <button class="close-btn" @click="isVisible = !isVisible">&times;</button>
    {{ text }}
    </p>
</div> 
   `
});