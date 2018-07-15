const TYPES = {
   STRING : "STRING",
   NUMBER: "NUMBER"
}

function autoCast(value, type_whitelist = []){
   let details;

   if (!isNaN(value)) {
      details = { value: parseFloat(value), type: TYPES.NUMBER }
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