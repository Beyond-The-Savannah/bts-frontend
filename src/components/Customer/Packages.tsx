import { SubscriptionPackages } from "@/staticData/packages";
import { Button } from "../ui/button";

export default function Packages() {
  return (
    <>
      <div className="flex gap-4 items-center justify-evenly">
        {SubscriptionPackages.map((sub) => (
          <div key={sub.id} className="border rounded-lg space-y-4 px-4 py-6">
            <div className="flex flex-wrap gap-4 items-center justify-evenly">
                <p>{sub.packageName}</p> 
                <p> <span className="text-xs mr-1">KSH</span>{sub.packagePrice}</p>
            </div>
            <div>
              
              <div className="flex flex-col gap-4  mt-12 px-4">
                {sub.packageGoods.map((good, index) => (
                  <ul key={index} className="list-disc">
                    <li>{good}</li>
                  </ul>
                ))}
                <Button>Get Package</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
