"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { loginSchema } from "@/types/authTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { loginAction } from "@/actions/user";
import { Eye } from "lucide-react";
import { EyeOff } from "lucide-react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { useSearchParams } from "next/navigation";

type LoginFormData = z.infer<typeof loginSchema>;
export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [showTwoFactor, setShowTwoFactor] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>("");
  const [loginSuccess, setLoginSuccess] = useState<string>("");
  const searchParams = useSearchParams();
  useEffect(() => {
    const urlError = searchParams.get("error");
    if (urlError === "OAuthAccountNotLinked") {
      setLoginError(
        "This email is already linked to a different login method."
      );
    }
  }, [searchParams]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoginError("");
    setLoginSuccess("");
    try {
      const res = await loginAction(data);
      if (!res) return;
      if (!res.success) {
        // reset();
        setLoginError(res.error);
      }
      if (res.success) {
        // reset();
        setLoginSuccess(res.message);
      }
      //@ts-ignore
      if (res.twoFactor) {
        setShowTwoFactor(true);
      }
    } catch (error: any) {
      setLoginError(
        error.message || "An unknown error has occured during login"
      );
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              {showTwoFactor && (
                <Field>
                  <FieldLabel htmlFor="code">Two Factor Code</FieldLabel>
                  <Input
                    id="code"
                    type="text"
                    placeholder="123456"
                    disabled={isSubmitting}
                    {...register("code")}
                  />
                  {errors.code && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.code.message}
                    </p>
                  )}
                </Field>
              )}
              {!showTwoFactor && (
                <>
                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                      disabled={isSubmitting}
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </Field>
                  <Field>
                    <div className="flex items-center">
                      <FieldLabel htmlFor="password">Password</FieldLabel>
                      <Link
                        href="/reset"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                    <div className="relative ">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        required
                        className="pr-10"
                        {...register("password")}
                      />
                      <button
                        type="button"
                        // className="absolute   right-1.5 top-1.5 cursor-pointer"
                        className="absolute   right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isSubmitting}
                      >
                        {showPassword ? (
                          <EyeOff size={21} />
                        ) : (
                          <Eye size={21} />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.password.message}
                      </p>
                    )}
                  </Field>
                </>
              )}
              {loginError && (
                <p className="text-sm text-red-500 text-center">{loginError}</p>
              )}
              {loginSuccess && (
                <p className="text-sm text-green-500 text-center">
                  {loginSuccess}
                </p>
              )}
              <Field>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  ) : showTwoFactor ? (
                    "Confirm"
                  ) : (
                    "Login"
                  )}
                </Button>
                <Button
                  className="cursor-pointer"
                  variant="outline"
                  type="button"
                  onClick={async () => {
                    try {
                      await signIn("google", {
                        redirectTo: DEFAULT_LOGIN_REDIRECT,
                      });
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                >
                  Login with Google
                </Button>
                <Button
                  className="cursor-pointer"
                  variant="outline"
                  type="button"
                  onClick={async () => {
                    try {
                      await signIn("github", {
                        redirectTo: DEFAULT_LOGIN_REDIRECT,
                      });
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                >
                  Login with Github
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account?{" "}
                  <Link href="/signup">Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
