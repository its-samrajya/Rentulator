"use client";
const PrintButton = () => {
  return (
    <div className="mt-8 text-center print:hidden">
      <button
        onClick={() => window.print()}
        className="bg-blue-500 cursor-pointer text-white px-6 py-2 rounded"
      >
        Print Receipt
      </button>
    </div>
  );
};
export default PrintButton;
