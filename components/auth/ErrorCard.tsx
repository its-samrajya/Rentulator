import Link from "next/link";

const ErrorCard = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center p-4">
      <div className="w-100 rounded-lg bg-white p-8 shadow-lg flex flex-col items-center">
        <div className="mb-6 text-center">
          <h2 className="mb-2 text-2xl font-bold text-teal-500">
            Oops! Something went wrong!
          </h2>
        </div>
        <Link
          href="/login"
          className="text-white text-lg font-medium bg-teal-500 rounded-md p-4"
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
};
export default ErrorCard;
