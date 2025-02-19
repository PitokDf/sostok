export default function SkeletonProfile() {
    return (
        <div className="px-4 mb-16 container md:max-w-2xl">
            <div className="flex mb-3 items-center justify-evenly md:justify-center gap-3">
                <div className="w-24 bg-gray-500 animate-pulse rounded-full h-24 md:w-32 md:h-32"></div>
                <div className="flex justify-center md:justify-start space-x-8 my-4">
                    <div className="flex flex-col gap-2 items-center">
                        <div className="bg-gray-500 w-8 h-5 rounded-md animate-pulse"></div>
                        <div className="bg-gray-500 w-14 h-5 rounded-md animate-pulse"></div>
                    </div>
                    <div className="flex flex-col gap-2 items-center">
                        <div className="bg-gray-500 w-8 h-5 rounded-md animate-pulse"></div>
                        <div className="bg-gray-500 w-14 h-5 rounded-md animate-pulse"></div>
                    </div>
                    <div className="flex flex-col gap-2 items-center">
                        <div className="bg-gray-500 w-8 h-5 rounded-md animate-pulse"></div>
                        <div className="bg-gray-500 w-14 h-5 rounded-md animate-pulse"></div>
                    </div>
                </div>
            </div>
            <div className="mb-3 md:flex md:items-center space-y-1 md:flex-col">
                <div className="bg-gray-500 w-24 h-5 rounded-md animate-pulse"></div>
                <div className="bg-gray-500 w-24 h-5 rounded-md animate-pulse"></div>
            </div>
            <div className="flex gap-2 mb-3">
                <div className="bg-gray-500 flex-1 h-10 rounded-md animate-pulse"></div>
                <div className="bg-gray-500 flex-1 h-10 rounded-md animate-pulse"></div>
            </div>
            <div className="flex justify-around mb-3">
                <div className="bg-gray-500 w-24 h-10 rounded-md animate-pulse"></div>
                <div className="bg-gray-500 w-24 h-10 rounded-md animate-pulse"></div>
            </div>
            <div className="grid grid-cols-3 gap-[.15rem] md:gap-2">
                {
                    Array.from({ length: 12 }).map((_, index) => (
                        <div key={index} className="bg-gray-500 w-full h-40 rounded-md animate-pulse"></div>
                    ))
                }
            </div>
        </div>
    )
}