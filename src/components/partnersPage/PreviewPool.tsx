import { poolCandidateGroup } from "@/staticData/partnersPage";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

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
                <DialogTitle className="text-center">Our pool of candidates includes but not limited to :</DialogTitle>
                <DialogDescription className=" text-center text-xs"> hover over the categories to see the average years of experience of the candidates that we have in our pool </DialogDescription>
              </DialogHeader>
            </DialogHeader>
            <div className="container mx-auto px-4 py-8">
              <div className="max-w-xl mx-auto text-center pb-10">
                <p className="font-semibold">
                  
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {poolCandidateGroup.map((group) => (
                  <div key={group.id}>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="border rounded-xl px-4 py-1 bg-bts-BrownOne w-full md:w-[20rem]">
                          {group.title}
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{group.details}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
