import CookieParser from "cookie"

//On the server side, this middleware gets the "auth_token" from the cookie (if available), 
//and verifies it in order to populate the "auth" store
export default async function (context){
   
   if (context.isServer && context.req.headers.cookie){
      const cookie_object = CookieParser.parse(context.req.headers.cookie)
      if (cookie_object && cookie_object.auth_token) {
         await context.store.dispatch("auth/verifyToken", cookie_object.auth_token)
      }
   }

}