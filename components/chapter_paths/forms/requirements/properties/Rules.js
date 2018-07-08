export const INPUT_TYPES = {
   "NUMBER" : "Number",
   "STRING" : "String"
}
export default {
   "const": {
      label: "Equals To",
      input_type: [INPUT_TYPES.NUMBER, INPUT_TYPES.STRING]
   },
   "maximum": {
      label: "Maximum",
      input_type: INPUT_TYPES.NUMBER
   },
   "minimum" : {
      label: "Minimum",
      input_type: INPUT_TYPES.NUMBER
   }
}