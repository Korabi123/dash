import { SignIn as ClerkSignIn } from "@clerk/nextjs";

export const SignIn = () => {
  return (
    <ClerkSignIn
      appearance={{
        elements: {
          formButtonPrimary: "bg-branding-primary hover:bg-branding-primary/80 transition-all text-white",
          footerActionLink: "text-branding-primary hover:text-branding-primary hover:underline transition-all",
        }
      }}
    />
  );
}
