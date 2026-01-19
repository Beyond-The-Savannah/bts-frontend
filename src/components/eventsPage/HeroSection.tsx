import { Button } from "../ui/button";


export default function HeroSection() {
  return (
    <>
    <section className="">
        <div className="container mx-auto min-h-[80dvh] grid place-content-center gap-4  px-4">
            <h1 className="text-center text-9xl font-bold">Mixer Event</h1>
            <Button className="w-32">Buy Ticket</Button>
            <div className="space-y-4">
                <p className="c">Event Name & Branding: A clear title and a high-resolution logo.</p>
                <p className="c">Date & Time: The exact schedule, including time zones for virtual or international events.</p>
            </div>
        </div>
    </section>
    </>
  )
}
