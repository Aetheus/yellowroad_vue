<template>
   <div class="any-property">
      <div v-for="(rule_value, rule_type) in value" :key="rule_type">
         <label> 
            <select  
               :value="rule_type"
               @input="(event) => { ChangeRuleType(event, rule_type) }"
            > 
               <option disabled value="">Please select one</option>
               <option 
                  v-for="(rule,rule_title) in RULES"
                  :key="rule_title"
                  :value="rule_title"
               >
                  {{ RuleLabel(rule_title) }}
               </option>
               <option 
                  v-if="!RULES[rule_type]"
                  :value="rule_type">
                  {{rule_type}}
               </option>
            </select>            
         </label>: 
         <input type="text" 
            @input="(event) => { InputHandler(event, rule_type) }"
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
      return { RULES }
   },
   methods: {
      RuleLabel(rule_type){
         return RULES[rule_type] && RULES[rule_type].label ? RULES[rule_type].label : rule_type;
      },
      InputHandler(event, rule_type){
         const input_parser_exists = RULES[rule_type] && RULES[rule_type].input_parser;
         
         if (input_parser_exists) {
            const input_val = event.target.value;
            const { value, type, is_valid } = RULES[rule_type].input_parser(input_val);
            if (is_valid) {
               this.setRule(rule_type, value)
            } else {
               console.error("Error! Input was invalid!")
            }
         } else {
            const input_val = event.target.value;
            this.setRule(rule_type, input_val) 
         }
      },
      ChangeRuleType(event, rule_type) {
         const new_rule_type = event.target.value;
         const property = { ...this.value };
         
         const current_rule_value = property[rule_type];
         property[new_rule_type] = current_rule_value;
         delete property[rule_type];

         this.$emit("input", property)
      },
      removeRule(event, ) {

      },
      setRule(rule_type, rule_value) {
         const property = { ...this.value };
         property[rule_type] = rule_value;
         this.$emit("input", property)
      }
   }
}
</script>

<style>

</style>
