'use client'

// import { Button } from '@/components/ui/button';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
// import { Link } from 'next-view-transitions'


export default function NotFoundPage() {
  return (
    <>
        <section className="h-screen grid place-content-center px-4">
            <div className=' space-y-4 text-center'>
                <div>
                    <DotLottieReact 
                        src="https://lottie.host/9b548843-5e51-4ab7-955d-7ec92d367c3c/Eqo17iXW8n.lottie"
                        loop
                        autoplay
                        className='size-auto'
                    />
                </div>
                <p className="text-lg">
                    Looks like we can&apos;t find that page    
                </p>
                {/* <p className="c"> lets take you back or head home</p> */}
                {/* <div className="flex gap-4 items-center justify-center">
                    <Link href='/' className='py-2 px-4'>
                        <Button >Sweet Home</Button>
                    </Link>
                    <Link href='/' className='py-2 px-4'>
                        <Button >Back where I was</Button>
                    </Link>
                </div> */}
            </div>
        </section>
    </>
  )
}
