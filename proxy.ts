import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export const proxy = withAuth(function middleware(_request: NextRequest) {
  return NextResponse.next();
}, {
  callbacks: {
    authorized: ({ token }) => !!token,
  },
});

export const config = {
  matcher: ["/recipes/new", "/recipes/:id/edit"],
};
