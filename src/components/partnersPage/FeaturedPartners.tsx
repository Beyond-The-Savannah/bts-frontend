import { brands } from "@/staticData/partnersPage";
import DisplayImageFromNextCloudinary from "../DisplayImageFromNextCloudinary";


export default function FeaturedPartners() {
  return (
    <section className="min-h-screen">
        <div className="container mx-auto px-4">
            <div className="py-10">
                <p className="text-l">Our Collaborators</p>
                <div className="border-2 rounded-md border-bts-BrownThree w-36"></div>
                <h2 className="text-4xl font-bold text-bts-GreenOne mt-2">Featured Partners</h2>
            </div>
            <div className="text-center pt-4">
                <p className="max-w-3xl mx-auto text-balance">We&apos;re proud to work with organizations that share our vision of a borderless job market. Each partner brings unique value whether through hiring, training, or mentorship to help us deliver lasting impact.</p>
            </div>
            <div className="flex flex-wrap justify-evenly items-center gap-4 md:gap-20 mt-10 mb-40">
                {brands.map((brand)=>(
                    <div key={brand.id} className="w-3/12 md:w-2/12 h-[20dvh] bg-purple-3000 hover:shadow-md hover:scale-105 duration-700 rounded-lg">
                        <DisplayImageFromNextCloudinary
                            src={brand.imageSrc}
                            height={800}
                            width={800}
                            sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw, 33vw"
                            alt={`Beyond The Savannah partner brand ${brand.name}`}
                            classname="object-contain h-full w-full rounded-lg"
                        />
                        <p className="py-4 text-center font-semibold text-xs ">{brand.name}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
  )
}
