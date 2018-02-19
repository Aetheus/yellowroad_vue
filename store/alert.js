export const state = () => ({
   queue : []
});

export const mutations = {
   //'alert' should have the shape of ... { message: "", type: "error|notification|etc"} (make this an object so we can extend it later)
   add(state, alert) {
      //add a random ID so it can be removed later with "remove"
      alert.alert_id = generateRandomID();
      state.queue.push(alert);
   },
   remove(state, alert_id){
      state.queue = state.queue.filter( 
         (alert) => alert.alert_id != alert_id 
      )
   }
}

export const actions = {
}  


function generateRandomID() {
   let id = "";
   for (let i = 0; i < 4; i++) {
      id += (Math.random() + 1).toString(16).slice(-4) + "-";
   }
   id = id.slice(0, id.length - 1)
   return id
}