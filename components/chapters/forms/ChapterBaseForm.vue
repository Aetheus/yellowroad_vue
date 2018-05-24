<template>
	<div>
		<div v-if="header" class="field">
			<h1 class="title">
				{{header}}
			</h1>
		</div>

		<div class="field">
			<label class="label" for="chapter-title">Title</label>
			<div class="control">
				<input 
					:value="value.title"
					@input="(eve) => {updateField('title',eve.target.value)}" 
					name="chapter-title" class="input" type="text" placeholder="Chapter Title"
				>
			</div>
		</div>
		<div class="field">
			<label class="label" for="chapter-body">Body</label>
			<div class="control">
				<!--TODO: replace with a proper Markdown editor with a preview, buttons for common styles, etc -->
				<textarea 					
					:value="value.body"
					@input="(eve) => {updateField('body',eve.target.value)}" 
					name="chapter-body" class="textarea" :rows="settings.initial_body_rows" placeholder="It all began with ... "
				>
				</textarea>
			</div>
		</div>
		
		<slot name="before-End">
		</slot>
		<!-- <div class="field is-grouped">
			<p class="control">
				<a v-on:click="this.emitSubmit" class="button is-primary"> Submit </a>
			</p>
			<p class="control">
				<a v-on:click="this.emitCancel" class="button is-light"> Cancel </a>
			</p> 
		</div>-->
	</div>
</template>

<script>
export default {
   name: "chapter-base-form",
   components: {},
   props: ["value", "formSettings", "header", "chapterId", "storyId"],
   data() {
		const defaultFormState = {title:"",body:""}

      return {
			form_state: { ...defaultFormState , ...this.initialFormState,  }
      }
	},
	computed: {
		settings(){
			const defaultSettings = {initial_body_rows: 18}
			return { ...defaultSettings , ...this.formSettings };
		}
	},
   methods: {
		test(v){
			console.log(v)
		},
		updateField(fieldName, fieldValue){
			const form_state = {...this.value};
			form_state[fieldName] = fieldValue;
			this.$emit("input", form_state)
		},
      // emitSubmit() {
      //    this.$emit("submit", this.form_state)
      // },
      // emitCancel() {
      //    this.$emit("cancel", this.form_state)
      // }
   }
}
</script>

<style>

</style>


