export default function Card_Skeletion() {
    return <>
        <div
            className="group relative overflow-hidden rounded-xl bg-gray-800/50 border border-gray-700 p-4 hover:shadow-lg transition-all duration-300"
        >
            {/* Gradient accent */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500/30 to-teal-400/30"></div>

            {/* Blur effect */}
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-teal-500/10 rounded-full filter blur-xl opacity-30"></div>

            <div className="relative z-10">
                {/* Role skeleton */}
                <div className="h-7 w-40 bg-gray-700 rounded-md mb-2 animate-pulse"></div>

                {/* Button skeletons */}
                <div className="flex flex-wrap gap-2">
                    <div className="h-10 w-32 bg-gray-700 rounded-md m-2 animate-pulse"></div>
                    <div className="h-10 w-32 bg-gray-700 rounded-md m-2 animate-pulse"></div>
                </div>
            </div>

            {/* Shimmer effect overlay */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gray-600/10 to-transparent animate-[shimmer_1.5s_infinite]"></div>
        </div>

    </>
}