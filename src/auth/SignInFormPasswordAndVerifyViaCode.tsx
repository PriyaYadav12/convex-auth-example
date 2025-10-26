import { useAuthActions } from "@convex-dev/auth/react";
import { CodeInput } from "@/auth/CodeInput";
import { ResetPasswordWithEmailCode } from "@/auth/ResetPasswordWithEmailCode";
import { SignInMethodDivider } from "@/auth/SignInMethodDivider";
import { SignInWithOAuth } from "@/auth/SignInWithOAuth";
import { SignInWithPassword } from "@/auth/SignInWithPassword";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

/**
 * Users choose between OAuth providers or email and password combo
 * with required email verification and optional password reset via OTP.
 */
export function SignInFormPasswordAndVerifyViaCode() {
  const { signIn } = useAuthActions();
  const { toast } = useToast();
  const [step, setStep] = useState<"signIn" | { email: string } | "forgot">(
    "signIn",
  );
  const [submitting, setSubmitting] = useState(false);
  return (
    <div className="max-w-[384px] mx-auto flex flex-col gap-4">
      {step === "signIn"? (
        <>
          <h2 className="font-semibold text-2xl tracking-tight">
            Sign in or create an account
          </h2>
          <SignInWithOAuth />
          <SignInMethodDivider />
          <SignInWithPassword
            handleSent={(email) => setStep({ email })}
            handlePasswordReset={() => setStep("forgot")}
            provider="password-code"
          />
        </>
      ) : step === "forgot" ? (
        <ResetPasswordWithEmailCode
          provider="password-code"
          handleCancel={() => setStep("signIn")}
        />
      ) : (
        <>
          <h2 className="font-semibold text-2xl tracking-tight">
            Check your email
          </h2>
          <p className="text-muted-foreground text-sm">
            Enter the 5-digit code we sent to your email address.
          </p>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setSubmitting(true);
              const formData = new FormData(event.currentTarget);
              signIn("password-code", formData).catch((error) => {
                console.error(error);
                toast({
                  title: "Code could not be verified, try again",
                  variant: "destructive",
                });
                setSubmitting(false);
              });
            }}
          >
            <div className="space-y-2 relative z-50">
              <label htmlFor="code" className="block text-sm font-medium relative z-50">Code</label>
              <div className="relative z-50 bg-white p-2 rounded-lg">
                <CodeInput />
              </div>
            </div>
            <input name="email" value={step.email} type="hidden" />
            <input name="flow" value="email-verification" type="hidden" />
            <Button type="submit" disabled={submitting}>
              Continue
            </Button>
            <Button
              type="button"
              variant="link"
              onClick={() => setStep("signIn")}
            >
              Cancel
            </Button>
          </form>
        </>
      )}
      <Toaster />
    </div>
  );
}
