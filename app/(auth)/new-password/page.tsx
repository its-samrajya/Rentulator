import { NewPasswordForm } from "@/components/NewPasswordForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Set New Password",
};

const NewPasswordPage = () => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <NewPasswordForm />
      </div>
    </div>
  );
};
export default NewPasswordPage;
