import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { GetAllEvents } from "@/db/queries/eventsQuries";

export const dynamic= "force-dynamic"

export default async function page() {
    const attendees=await GetAllEvents()
    
  return (
    <>
    <section className="mt-10 px-4">
        <div className="c">
            <h2 className="text-3xl font-semibold">BTS March Mixer Event</h2>
            <div className="border-2 rounded-md border-bts-GreenOne w-36 mb-8"></div>
        </div>
        <div className="flex w-full items-center justify-end gap-4 mb-10">
              <div className="border rounded-xl px-3 py-1">
           Attendees:{" "}
          <span className="font-bold">{attendees.length}/60</span>
        </div>
        </div>
        <div className="c">
            <Table>
                <TableCaption>BTS March Mixer Event Attendees List</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>First Name</TableHead>
                        <TableHead>Last Name</TableHead>
                        <TableHead>Email Address</TableHead>
                        <TableHead>Phone Number</TableHead>
                        <TableHead className="w-48">Event Name</TableHead>
                        <TableHead className="w-48">Created At</TableHead>
                        {/* <TableHead className="w-48">Updated At</TableHead> */}
                    </TableRow>
                </TableHeader>
                <TableBody>
                        {attendees.map((attendee)=>(
                    <TableRow key={attendee.id}>
                            <TableCell >{attendee.firstName}</TableCell>
                            <TableCell >{attendee.lastName}</TableCell>
                            <TableCell >{attendee.email}</TableCell>
                            <TableCell >{attendee.phoneNumber}</TableCell>
                            <TableCell className="text-[0.5rem] 2xl:text-[0.5rem]">{attendee.eventName}</TableCell>
                            <TableCell className="text-[0.5rem] 2xl:text-xs">{new Date(attendee.createdAt).toDateString()} - {new Date(attendee.createdAt).toLocaleTimeString()}</TableCell>
                            {/* <TableCell className="text-[0.5rem] 2xl:text-xs">{new Date(attendee.updatedAt).toLocaleDateString()} - {new Date(attendee.updatedAt).toLocaleTimeString()}</TableCell> */}
                    </TableRow>
                        ))}
                </TableBody>
            </Table>
        </div>
    </section>
    </>
  )
}
