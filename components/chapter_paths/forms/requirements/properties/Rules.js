const TYPES = {
   STRING : "STRING",
   NUMBER: "NUMBER"
}

//courtesy of MDN (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseFloat)
function filterFloat(value) {
   if (/^(\-|\+)?([0-9]+(\.[0-9]+)?|Infinity)$/.test(value)){
      return Number(value);
   }
   return NaN;
}

function autoCast(value, type_whitelist = []){
   let details;
   const numeric_value = filterFloat(value);
   
   if (!isNaN(numeric_value)) {
      details = { value: numeric_value, type: TYPES.NUMBER }
   } else {
      details = { value, type: TYPES.STRING }
   }
   
   details.is_valid = type_whitelist.length > 1 ? type_whitelist.includes(details.type) : true;
   return details;
}

export default {
   "const": {
      label: "Equals To",
      input_parser: (input_val) => {
         return autoCast(input_val)
      }
   },
   "maximum": {
      label: "Maximum",
      input_parser: (input_val) => {
         return autoCast(input_val, [TYPES.NUMBER])
      }
   },
   "minimum" : {
      label: "Minimum",
      input_parser: (input_val) => {
         return autoCast(input_val, [TYPES.NUMBER])
      }
   }
}