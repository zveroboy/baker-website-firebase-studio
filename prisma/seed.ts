
import { auth } from "../src/lib/auth";
import { prisma } from "../src/lib/db";

async function main() {
  console.log("Seeding database...");

  try {
    const email = "admin@example.com";
    const password = "password123";

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.log("Admin user already exists.");
    } else {
      console.log("Creating admin user...");
      // We can try to use auth.api.signUpEmail directly if it works in this context
      // However, auth.api often expects a request context or might behave differently.
      // Since better-auth is a library, let's try to use it.
      // Note: If this fails, we might need to use internal utilities or manual hash if better-auth exports it.
      
      // Better Auth usually requires a running server for API calls unless using internal functions?
      // Wait, auth.api.signUpEmail in better-auth (server side) IS the internal function call usually.
      
      const res = await auth.api.signUpEmail({
        body: {
          email,
          password,
          name: "Admin User",
        },
        asResponse: false // Get the data directly
      });

      if (res?.user) {
         console.log("Admin user created via Better Auth.");
         await prisma.user.update({
            where: { id: res.user.id },
            data: { role: "admin" }
         });
         console.log("User promoted to admin.");
      } else {
        console.error("Failed to create user via Better Auth:", res);
      }
    }
  } catch (e) {
    console.error("Error seeding database:", e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();

