import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { fetchCheckAuth } from "./services/auth";
import { everyoneRoutes, notAuthRoutes } from "./utils/routes";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isStaticAsset =
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.match(/\.(png|jpg|jpeg|gif|ico|css|js)$/);
  const isApiRoute = pathname.startsWith("/api");

  const isForEveryone = everyoneRoutes.some((route: string) =>
    pathname.includes(route)
  );

  const isPublicRoute = notAuthRoutes.some((route: string) =>
    pathname.includes(route)
  );

  if (isForEveryone) {
    return NextResponse.next();
  }
  if (isStaticAsset || isApiRoute) {
    return NextResponse.next();
  }

  const token = request.cookies.get("token")?.value;
  const projectId = request.cookies.get("projectId")?.value;

  if ((!token || !projectId) && !isPublicRoute) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  if ((!token || !projectId) && isPublicRoute) {
    return NextResponse.next();
  }

  if (!token || !projectId) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  const authData = await fetchCheckAuth(token, projectId);

  if (!authData) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  if (!authData && !isPublicRoute) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  if (authData && isPublicRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Set cookies for token and projectId
  const response = NextResponse.next();
  response.cookies.set("token", authData.token, { httpOnly: false });
  response.cookies.set("projectId", authData.projectId, { httpOnly: false });

  return response;
}

export const config = {
  matcher: "/:path*",
};
