import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  if (request.url.includes("/my-page") && !request.cookies.get("session-id")) {
    return NextResponse.rewrite(new URL("/auth/login", request.url));
  }

  if (
    request.url.includes("/add-recipe") &&
    !request.cookies.get("session-id")
  ) {
    return NextResponse.rewrite(new URL("/auth/login", request.url));
  }

  // if (
  //   request.url.includes("/edit-recipe") &&
  //   !request.cookies.get("session_id")
  // ) {
  //   return NextResponse.rewrite(new URL("/auth/login", request.url));
  // }

  // if (request.url.includes("/admin") && !request.cookies.get("session_id")) {
  //   return NextResponse.rewrite(new URL("/auth/login", request.url));
  // }
}

export const config = {};
