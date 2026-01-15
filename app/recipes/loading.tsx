import { Container, Flex } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function LoadingRecipes() {
  return (
    <div className="py-12">
      <Container className="max-w-7xl mx-auto px-4">

        {/* Actions bar skeleton */}
        <Flex
          justify="between"
          align={{ initial: 'stretch', md: 'center' }}
          gap="4"
          mb="5"
          direction={{ initial: "column-reverse", md: "row" }}
        >
          <Skeleton height={44} width={160} borderRadius={12} />
          <Skeleton height={44} width={160} borderRadius={12} />
        </Flex>

        {/* Recipes skeleton list */}
        <div className="space-y-8 mb-12">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl shadow-md overflow-hidden border border-gray-100"
            >
              <div className="grid md:grid-cols-5 gap-0">
                {/* Image Skeleton */}
                <div className="md:col-span-2 relative h-64 md:h-80">
                  <Skeleton className="w-full h-full" />
                </div>

                {/* Content Skeleton */}
                <div className="md:col-span-3 p-6 md:p-8 flex flex-col">
                  <div className="mb-4">
                    <Skeleton height={32} width="70%" />
                    <Skeleton height={16} width="40%" className="mt-2" />
                  </div>
                  <div className="mb-6 space-y-2">
                    <Skeleton count={3} height={14} />
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-auto">
                    {Array.from({ length: 4 }).map((_, j) => (
                      <div key={j}>
                        <Skeleton height={10} width="60%" />
                        <Skeleton height={14} width="40%" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination skeleton */}
        <div className="flex justify-center gap-3">
          <Skeleton height={40} width={200} borderRadius={8} />
        </div>

      </Container>
    </div>
  );
}