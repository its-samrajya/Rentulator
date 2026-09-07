import { ResetForm } from "@/components/ResetForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password",
};

const ResetPage = () => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <ResetForm />
      </div>
    </div>
  );
};
export default ResetPage;
