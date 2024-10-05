import { NextResponse } from 'next/server'
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";

export async function middleware(request) {
  console.log("Middleware is running for:", request.url);
   
  const { isAuthenticated , getPermission } = getKindeServerSession();
  
  if (!(await isAuthenticated())) {
    // redirect("/api/auth/login");
    // return NextResponse.redirect(new URL("/home/api/auth/login?post_login_redirect_url=/", request.url))
    return NextResponse.redirect(new URL("/home", request.url));
  }else{
  const requirePermission = await getPermission("all");
  if(!requirePermission?.isGranted){
    return NextResponse.redirect(new URL("/home", request.url));

  }
}
}
 
    
export const config = {
  matcher: ["/dashboard/:path*"],
}