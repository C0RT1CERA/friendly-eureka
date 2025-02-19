import Image from "next/image";
import Link from "next/link";

export function CategorySelection(){
    return(
        <div className="py-24 sm:py-32">
            <div className="flex justify-between">
                <h1>Shop By Category</h1>
                <Link href="/products/all" className="text-sm font-semibold text-primary hover:text-primary/80">
                    Browse all Products &rarr;
                </Link>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6 lg:gap-8">
                <div className="group aspect-w-2 aspect-h-1 rounded-xl overflow-hidden sm:aspect-w-1 sm:row-span-2 ">
                    <Image src="/all.png"
                        alt="all product image"
                        className="object-cover object-center" fill
                    />
                    <div className="bg-gradient-to-b from-transparent to-black opacity-55"/>

                    <div className="p-6 flex items-end">
                        <Link href="/products/all">
                            <h3 className="text-white font-semibold">Educational Resources</h3>
                            <p className="mt-1 text-sm text-white">Check Now</p>
                        </Link>
                    </div>
                </div>

                <div className="group aspect-w-2 aspect-h-1 rounded-xl overflow-hidden sm:relative sm:aspect-none sm:h-full ">
                    <Image src="/women.png"
                        alt="women product image"
                        className="object-bottom object-cover sm:absolute sm:inset-0 sm:w-full sm:h-full" fill
                    />
                    <div className="bg-gradient-to-b from-transparent to-black opacity-55 sm:absolute sm:inset-0"/>

                    <div className="p-6 flex items-end sm:absolute sm:inset-0">
                        <Link href="/products/all">
                            <h3 className="text-white font-semibold">Best Practices and Tips</h3>
                            <p className="mt-1 text-sm text-white">Check Now</p>
                        </Link>
                    </div>
                </div>

                <div className="group aspect-w-2 aspect-h-1 rounded-xl overflow-hidden sm:relative sm:aspect-none sm:h-full ">
                    <Image src="/man.png"
                        alt="Industry Insights and Trends"
                        className="object-center object-cover sm:absolute sm:inset-0 sm:w-full sm:h-full" fill
                    />
                    <div className="bg-gradient-to-b from-transparent to-black opacity-55 sm:absolute sm:inset-0"/>

                    <div className="p-6 flex items-end sm:absolute sm:inset-0">
                        <Link href="/products/all">
                            <h3 className="text-white font-semibold">Industry Insights and Trends</h3>
                            <p className="mt-1 text-sm text-white">Check Now</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}