"use client";

import { verificationAction } from "@/actions/user";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function NewVerificationForm() {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const handleSubmit = useCallback(() => {
    if (!token) {
      setError("Missing Token");
      return;
    }
    verificationAction(token).then((data) =>
      data.success ? setSuccess(data.message) : setError(data.error)
    );
  }, [token]);

  useEffect(() => {
    handleSubmit();
  }, [handleSubmit]);

  console.log(error);

  return (
    <div className="h-screen w-full flex items-center justify-center p-4">
      <div className="w-100 rounded-lg bg-white p-8 shadow-lg flex flex-col items-center">
        <div className="mb-6 text-center">
          <h2 className="mb-2 text-2xl font-bold text-teal-500">
            Confirm your verification
          </h2>
        </div>
        {!error && !success && (
          <div className="flex items-center justify-center ">
            <Loader2 className="h-8 w-8 animate-spin text-black stroke-2" />
          </div>
        )}

        {error && (
          <div className="text-sm font-medium text-red-500 text-center">
            {error}
          </div>
        )}
        {success && (
          <div className="text-base font-medium text-green-500 text-center">
            {success}
          </div>
        )}
        <Link
          href="/login"
          className="text-white text-lg mt-5 font-medium bg-teal-500 rounded-md p-4"
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
}
