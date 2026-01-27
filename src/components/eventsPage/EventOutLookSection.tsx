import { Calendar, Cookie, Handshake, MapPin, Martini, PersonStanding, ShoppingBag, Timer } from "lucide-react";

export default function EventOutLookSection() {
  return (
    <>
      <section className=" bg-bts-BrownTwo z-30">
        <div className="container mx-auto min-h-[80dvh] grid py-20 gap-4  px-4">
          <h2 className="text-center text-3xl lg:text-5xl font-bold">
            Elevate Your Career Beyond Borders
          </h2>
          <div className="max-w-2xl mx-auto space-y-10">
            <p className="text-center">
              The world is no longer confined to four walls. Neither is your
              career.<br/> Beyond the Savannah invites you to an exclusive corporate
              mixer designed to bridge the gap between local expertise and
              global reach.
            </p>
            <p className="text-center hidden">
              This isn&apos;t just another networking event; it&apos;s a strategic gateway
              to your next international chapter. Whether you&apos;re a seasoned
              digital nomad or looking to land your first global role, this
              mixer is where your world gets bigger.
            </p>
          </div>
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 mt-20 gap-20">
          <div className="border-2 rounded-xl px-8 py-10">
            <p className="text-lg font-bold pb-10">Event Details</p>
            <ul className="list-none space-y-4">
              <li><Calendar className="inline"/> Date: <span className="font-medium">14-March-2026</span></li>
              <li><Timer className="inline"/> Time: <span className="font-medium">2:00 PM - 8:00 PM</span></li>
              <li><MapPin className="inline"/> Location: <span className="font-medium">BaoBox, Nairobi</span></li>
              <li><PersonStanding className="inline"/> Dress Code: <span className="font-medium">Smart Casual (Look sharp, stay comfortable)</span></li>
            </ul>
          </div>
          <div className="border-2 rounded-xl px-8 py-10">
          <p className="text-lg font-bold pb-10"> What Your Ticket Includes</p>
            <ul className="list-none space-y-4">
              <li><Cookie className="inline"/> Snacks: <span className="font-medium">Bitings and a drink</span></li>
              <li><ShoppingBag className="inline"/> Goodie Bag: <span className="font-medium">Something to remember us by</span></li>
              {/* <li><Handshake className="inline"/> Hands-on Workshop: <span className="font-medium">Learn exactly how to script and film a high-converting Remote Work Introductory Video to wow international employers.</span></li> */}
              <li><Handshake className="inline"/> Workshop: <span className="font-medium">Script & film a Remote Work Introductory Video</span></li>
              <li><Martini className="inline"/> Cocktail: <span className="font-medium">To wind down the networking</span></li>
            </ul>
          </div>
        </div>
        </div>
      </section>
    </>
  );
}
