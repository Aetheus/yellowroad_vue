import RESOURCE_STATES from "@/constants/resource_states";

export default {
   methods : {
      isLoaded(resource) {
         return resource && resource != RESOURCE_STATES.FAILED && resource != RESOURCE_STATES.LOADING;
      },
      isFailed(resource) {
         return resource == RESOURCE_STATES.FAILED
      },
      isLoading(resource) {
         return resource == RESOURCE_STATES.LOADING
      }
   }
}