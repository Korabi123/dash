import { SignUp as ClerkSignUp } from "@clerk/nextjs";

export const SignUp = () => {
  return (
    <ClerkSignUp
      appearance={{
        elements: {
          formButtonPrimary: "bg-branding-primary hover:bg-branding-primary/80 transition-all text-white",
          footerActionLink: "text-branding-primary hover:text-branding-primary hover:underline transition-all",
        }
      }}
    />
  );
}
