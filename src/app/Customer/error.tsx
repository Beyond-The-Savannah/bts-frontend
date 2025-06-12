'use client'

import DisplayImageFromNextCloudinary from "@/components/DisplayImageFromNextCloudinary"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { startTransition } from "react"
import { toast } from "sonner"

export default function ErrorPage({reset}:{reset:()=>void}) {
    const router=useRouter()
    const reload=()=>{
        startTransition(()=>{
            toast.message("Reloading page...")
            router.refresh()
            reset()
        })
    }
  return (
    <>
        <section className="min-h-[60dvh]">
            <div className="min-h-[60dvh] max-w-4xl mx-auto grid place-content-center">
            {/* <div className="min-h-[60dvh] max-w-4xl mx-auto flex justify-center items-center"> */}
                <div className="space-y-4 text-center mt-20">
                    <DisplayImageFromNextCloudinary
                        src="error-image_ehrwy1"
                        height={800}
                        width={800}
                        alt="Error image"
                        classname="object-contain h-96 w-full rounded-lg shadow-lg"
                    />
                    <p className="text-xl font-bold">Opps, looks like we have an issue</p>
                    <p className="c">Try clicking the button below to resolve it</p>
                    <Button 
                    onClick={()=>reload()}
                    className="font-semibold text-black bg-bts-BrownFour hover:bg-bts-BrownThree hover:text-white hover:scale-105 transition duration-500 text-base">Reload Page</Button>
                </div>
            </div>
        </section>
    </>
  )
}
