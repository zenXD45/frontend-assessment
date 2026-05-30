import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

export const config = {
  // Protect these routes and their sub-routes
  matcher: ["/dashboard/:path*", "/users/:path*", "/products/:path*"],
};
