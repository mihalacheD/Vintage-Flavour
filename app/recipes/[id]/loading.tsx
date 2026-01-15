import { Container } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";

export default function LoadingRecipeDetail() {
  return (
    <div className="min-h-screen py-8">
      <Container className="max-w-5xl mx-auto px-4">

        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">

          {/* Hero image */}
          <Skeleton height={380} className="w-full rounded-t-3xl" />

          <div className="p-8 md:p-12">

            {/* Title */}
            <div className="text-center mb-10">
              <Skeleton height={42} width="70%" className="mx-auto mb-4" />
              <Skeleton height={18} width="30%" className="mx-auto" />
            </div>

            {/* Info cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-gray-200 p-4"
                >
                  <Skeleton height={40} width={40} className="mb-3 rounded-lg" />
                  <Skeleton height={14} width="60%" className="mb-2" />
                  <Skeleton height={20} width="80%" />
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="mb-10">
              <Skeleton height={26} width={180} className="mb-4" />
              <div className="rounded-2xl border border-gray-200 p-6">
                <Skeleton count={3} />
              </div>
            </div>

            {/* Ingredients */}
            <div className="mb-10">
              <Skeleton height={26} width={180} className="mb-4" />
              <div className="rounded-2xl border border-gray-200 p-6 space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} height={18} />
                ))}
              </div>
            </div>

            {/* Instructions */}
            <div>
              <Skeleton height={26} width={180} className="mb-4" />
              <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="border-l-4 border-gray-200 rounded-2xl p-6"
                  >
                    <Skeleton count={2} />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </Container>
    </div>
  );
}
