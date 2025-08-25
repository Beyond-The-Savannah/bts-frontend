import { poolCandidateGroup2 } from "@/staticData/partnersPage";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

export default function PreviewPool() {
  return (
    <section className="">
      <div className="container mx-auto">
        <Dialog>
          <DialogTrigger asChild className="">
            <Button variant="outline">Preview our pool of candidates</Button>
          </DialogTrigger>
          {/* <DialogContent className="max-w-[36rem]"> */}
          <DialogContent className="max-w-[46rem]">
            <DialogHeader>
              <DialogHeader>
                <DialogTitle className="text-center">Our pool of candidates includes:</DialogTitle>
                <DialogDescription className="hidden text-center text-xs"> hover over the categories to see the average years of experience of the candidates that we have in our pool </DialogDescription>
              </DialogHeader>
            </DialogHeader>
            <div className="container mx-auto px-4 py-8">
              <div className="max-w-xl mx-auto text-center pb-10">
                <p className="font-semibold">
                  
                </p>
              </div>
              <div className="">
                  <Table className="">
                    <TableCaption className="hidden">Our pool of candidates includes</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="font-medium text-black">Field</TableHead>
                        <TableHead className="font-medium text-black">Number of candidates</TableHead>
                        <TableHead className="font-medium text-black">Ratio</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {poolCandidateGroup2.map((group)=>(
                        <TableRow key={group.id}>
                          <TableCell>{group.fieldName}</TableCell>
                          <TableCell className="text-center">{group.fieldNumber}</TableCell>
                          <TableCell>{group.fieldPercentage}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
