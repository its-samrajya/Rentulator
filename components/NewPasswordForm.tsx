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
import { newPasswordSchema } from "@/types/authTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { newPasswordAction } from "@/actions/new-password";

type newPasswordFormData = z.infer<typeof newPasswordSchema>;
export function NewPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [newPasswordError, setNewPasswordError] = useState<string>("");
  const [newPasswordSuccess, setNewPasswordSuccess] = useState<string>("");
  const searchParams = useSearchParams();

  const token = searchParams.get("token");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<newPasswordFormData>({
    resolver: zodResolver(newPasswordSchema),
  });

  const onSubmit = async (data: newPasswordFormData) => {
    setNewPasswordError("");
    setNewPasswordSuccess("");
    if (!token) {
      setNewPasswordError("Missing token");
      return;
    }

    try {
      const res = await newPasswordAction(data, token);
      if (!res) return;
      if (!res.success) return setNewPasswordError(res.error);
      setNewPasswordSuccess(res.message);
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error: any) {
      setNewPasswordError(
        error.message || "An unknown error has occured during resetting"
      );
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Enter a new password</CardTitle>
          <CardDescription>Enter a new password</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
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
                    className="absolute   right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isSubmitting}
                  >
                    {showPassword ? <EyeOff size={21} /> : <Eye size={21} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.password.message}
                  </p>
                )}

                <FieldDescription>
                  Must be at least 8 characters long.
                </FieldDescription>
              </Field>
              <Field>
                <FieldLabel htmlFor="confirm-password">
                  Confirm Password
                </FieldLabel>
                <div className="relative ">
                  <Input
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    className="pr-10"
                    {...register("confirmPassword")}
                  />
                  <button
                    type="button"
                    className="absolute   right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={isSubmitting}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={21} />
                    ) : (
                      <Eye size={21} />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
                <FieldDescription>
                  Please confirm your password.
                </FieldDescription>
              </Field>

              {newPasswordError && (
                <p className="text-sm text-red-500 text-center">
                  {newPasswordError}
                </p>
              )}
              {newPasswordSuccess && (
                <p className="text-sm text-green-500 text-center">
                  {newPasswordSuccess}
                </p>
              )}
              <Field>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    "Reset password"
                  )}
                </Button>

                <FieldDescription className="text-center">
                  Don&apos;t have an account?{" "}
                  <Link href="/signup">Create a new account</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
