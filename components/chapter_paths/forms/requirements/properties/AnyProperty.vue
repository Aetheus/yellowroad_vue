<template>
   <div class="any-property">
      <div v-for="(rule_value, rule_name) in value" :key="rule_name">
         <label> {{ RuleLabel(rule_name) }} </label>: 
         <input type="text" 
            @input="(event) => { InputHandler(event, rule_name) }"
            :value="rule_value"
         >
      </div>
   </div>
</template>

<script>
import RULES, {INPUT_TYPES} from "./Rules";

export default {
   name: "AnyProperty",
   props: {
      "value": { type: Object }
   },
   data(){
      return {}
   },
   methods: {
      RuleLabel(rule_name){
         return RULES[rule_name] && RULES[rule_name].label ? RULES[rule_name].label : rule_name;
      },
      InputHandler(event, rule_name){
         const input_parser_exists = RULES[rule_name] && RULES[rule_name].input_parser;
         
         if (input_parser_exists) {
            const input_val = event.target.value;
            const { value, type, is_valid } = RULES[rule_name].input_parser(input_val);
            if (is_valid) {
               this.setRule(rule_name, value)
            } else {
               console.error("Error! Input was invalid!")
            }
         } else {
            const input_val = event.target.value;
            this.setRule(rule_name, input_val) 
         }
      },
      removeRule() {

      },
      setRule(rule_name, rule_value) {
         const property = { ...this.value };
         property[rule_name] = rule_value;
         this.$emit("input", property)
      }
   }
}
</script>

<style>

</style>
