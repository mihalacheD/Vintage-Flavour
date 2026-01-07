import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const LoadingRecipeDetails = () => {
  return (
    <div className="bg-white min-h-screen max-w-5xl mx-auto px-4 py-8 rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Hero Image */}
      <div className="relative w-full h-96 bg-gray-200 overflow-hidden">
        <Skeleton height="100%" />

        {/* Category Badge */}
        <div className="absolute top-6 left-6">
          <Skeleton width={120} height={36} borderRadius={999} />
        </div>
      </div>

      {/* Content */}
      <div className="p-8 md:p-12">

        {/* Title & Author */}
        <div className="text-center mb-10">
          <Skeleton height={48} width="60%" className="mx-auto mb-4" />
          <Skeleton height={20} width="30%" className="mx-auto" />
        </div>

        {/* Quick Info Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="rounded-xl p-4 border border-gray-200 bg-gray-50"
            >
              <div className="flex items-center gap-3 mb-2">
                <Skeleton circle width={40} height={40} />
                <div className="flex-1">
                  <Skeleton height={12} width="60%" />
                  <Skeleton height={20} width="40%" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Description */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <Skeleton width={48} height={4} />
            <Skeleton width={150} height={28} />
          </div>
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <Skeleton count={3} />
          </div>
        </div>

        {/* Ingredients */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <Skeleton width={48} height={4} />
            <Skeleton width={150} height={28} />
          </div>
          <div className="rounded-2xl p-6 border border-gray-200 bg-orange-50">
            <ul className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Skeleton circle width={24} height={24} />
                  <Skeleton height={18} width="80%" />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Instructions */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Skeleton width={48} height={4} />
            <Skeleton width={180} height={28} />
          </div>

          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border-l-4 border-gray-200 shadow-sm"
              >
                <div className="flex gap-4">
                  <Skeleton circle width={40} height={40} />
                  <Skeleton height={18} width="85%" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default LoadingRecipeDetails
