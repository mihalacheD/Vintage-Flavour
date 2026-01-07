import { Container } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingRecipes = () => {
  return (
    <div className="py-12">
      <Container className="max-w-7xl mx-auto px-4">

        {/* Actions bar skeleton */}
        <div className="mb-12 flex gap-4">
          <Skeleton height={44} width={160} borderRadius={12} />
          <Skeleton height={44} width={160} borderRadius={12} />
        </div>

        {/* Recipes skeleton list */}
        <div className="space-y-8 mb-12">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl shadow-md overflow-hidden border border-gray-100"
            >
              <div className="grid md:grid-cols-5 gap-0">

                {/* Image */}
                <div className="md:col-span-2 relative h-64 md:h-auto">
                  <Skeleton className="w-full h-full" />
                  <div className="absolute top-4 left-4">
                    <Skeleton height={22} width={90} borderRadius={999} />
                  </div>
                </div>

                {/* Content */}
                <div className="md:col-span-3 p-6 md:p-8 flex flex-col">

                  {/* Title & author */}
                  <div className="mb-4">
                    <Skeleton height={32} width="70%" />
                    <Skeleton height={16} width="40%" className="mt-2" />
                  </div>

                  {/* Description */}
                  <div className="mb-6 space-y-2">
                    <Skeleton height={14} />
                    <Skeleton height={14} />
                    <Skeleton height={14} width="80%" />
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                    {Array.from({ length: 4 }).map((_, j) => (
                      <div key={j} className="flex items-center gap-2">
                        <Skeleton circle width={28} height={28} />
                        <div className="flex-1">
                          <Skeleton height={10} width="60%" />
                          <Skeleton height={14} width="40%" className="mt-1" />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Read more */}
                  <div className="mt-auto">
                    <Skeleton height={18} width={140} />
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination skeleton */}
        <div className="flex justify-center gap-3">
          <Skeleton height={36} width={36} borderRadius={8} />
          <Skeleton height={36} width={36} borderRadius={8} />
          <Skeleton height={36} width={36} borderRadius={8} />
        </div>

      </Container>
    </div>
  );
};

export default LoadingRecipes;
