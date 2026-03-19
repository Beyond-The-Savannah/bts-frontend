
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/empty";
import { ShieldX } from "lucide-react";

export default async function AccessDenied() {
  
    return (
      <>
        <Empty className="border border-dotted w-6/12 mx-auto mt-40">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <ShieldX className="text-red-400" />
            </EmptyMedia>
            <EmptyTitle>Access Denied.</EmptyTitle>
            <EmptyDescription className="w-full lg:w-[28dvw]">
              Please create an organisation or be an organisation member
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent></EmptyContent>
        </Empty>
      </>
    );
  
  
}
