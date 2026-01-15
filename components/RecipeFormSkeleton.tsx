import { Container, Heading, Box } from "@radix-ui/themes";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "./Skeleton";

const RecipeFormSkeleton = () => {
  return (
    <div className="min-h-dvh flex justify-center bg-gray-50 px-3 py-4 sm:px-4 sm:py-8">
      <Container size="3" className="max-w-5xl">
        <Box className="bg-white rounded-4xl shadow-xl border border-gray-200 overflow-hidden">

          {/* Header skeleton */}
          <div className="bg-linear-to-r from-[#EC9131] to-[#d97e1f] px-8 py-10 text-center">
            <Heading size="9" className="text-white font-bold">
              <Skeleton width={220} height={36} baseColor="#f3a75a" />
            </Heading>
            <div className="mt-3 flex justify-center">
              <Skeleton width={280} height={18} baseColor="#f3a75a" />
            </div>
          </div>

          {/* Form skeleton */}
          <div className="p-8 md:p-12 space-y-10">

            {/* Title */}
            <div className="space-y-3">
              <Skeleton width={120} height={14} />
              <Skeleton height={56} className="rounded-2xl" />
            </div>

            {/* Categories */}
            <div className="space-y-4">
              <Skeleton width={100} height={14} />
              <div className="flex flex-wrap gap-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton
                    key={i}
                    width={90}
                    height={36}
                    className="rounded-full"
                  />
                ))}
              </div>
            </div>

            {/* Servings & Difficulty */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

              {/* Servings */}
              <div className="space-y-4">
                <Skeleton width={90} height={14} />
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <Skeleton
                      key={i}
                      width={48}
                      height={48}
                      className="rounded-xl"
                    />
                  ))}
                </div>
              </div>

              {/* Difficulty */}
              <div className="space-y-4">
                <Skeleton width={90} height={14} />
                <div className="flex gap-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton
                      key={i}
                      height={48}
                      className="flex-1 rounded-xl"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Times */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton width={160} height={14} />
                  <Skeleton height={56} className="rounded-2xl" />
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="space-y-3">
              <Skeleton width={120} height={14} />
              <Skeleton height={120} className="rounded-2xl" />
            </div>

            {/* Ingredients & Instructions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton width={140} height={14} />
                  <Skeleton height={260} className="rounded-2xl" />
                </div>
              ))}
            </div>

            {/* Image */}
            <div className="space-y-4">
              <Skeleton width={140} height={14} />
              <Skeleton
                height={220}
                className="rounded-2xl border-2 border-dashed"
              />
            </div>

            {/* Submit button */}
            <div className="pt-4">
              <Skeleton height={64} className="rounded-2xl" />
            </div>

          </div>
        </Box>
      </Container>
    </div>
  );
};

export default RecipeFormSkeleton;
