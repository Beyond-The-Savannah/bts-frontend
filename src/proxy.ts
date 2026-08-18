import { clerkMiddleware } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'


const isAdminRoute=["/Admin","/Admin/(.*)"]
const isCustomerRoute=["/Customer/(.*)"]
const isEmployerRoute=["/Employer/(.*)"]

export default clerkMiddleware( async (auth, request)=>{
    const {pathname}=request.nextUrl
    //Get Auth information
    const authResult=await auth()
    const {userId}=authResult
    const userRole=authResult.sessionClaims?.metadata?.role

    //Protect non-public routes
    if(pathname.startsWith("/Admin")||pathname.startsWith("/Customer")||pathname.startsWith("/Employer")){
        await auth.protect()
    }

    //Handle Admin routes
    // if(isAdminRoute(request)){
    if(isAdminRoute.some(route=>pathname.match(route))){
        if(userRole!=="admin"){
            const url=new URL("/Customer", request.url)
            return NextResponse.redirect(url)
        }}

    //Handle Customer routes
    if(isCustomerRoute.some(route=>pathname.match(route))){
        return NextResponse.next()
    }

    //Handle Employer routes
    if(isEmployerRoute.some(route=>pathname.match(route))){
        if(!userId){
            const url=new URL("/Employer", request.url)
            return NextResponse.redirect(url)
        }
        return NextResponse.next()
    }

    //If user just signed in and is on sign-in page, redirect based on role
    if((pathname==="/sign-in"||pathname==="/sign-up")&&userId&&userRole){
        if(userRole==="admin"){
            const url=new URL("/Admin", request.url)
            return NextResponse.redirect(url)
        }else{
            const url=new URL("/Customer", request.url)
            return NextResponse.redirect(url)
        }
    }
})


export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
    // Always run for Clerk-specific frontend API routes
    '/__clerk/(.*)',
  ],
}