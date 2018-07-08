<template>
   <div class="any-property">
      <div v-for="(rule_value, rule_name) in value" :key="rule_name">
         <label>{{rule_name}}</label>: <input type="text" :value="rule_value">
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
   methods: {
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
