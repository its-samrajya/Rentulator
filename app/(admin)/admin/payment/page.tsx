import FilterForm from "./_components/FilterForm";
import PaymentForm from "./_components/PaymentForm";
import PaymentList from "./_components/PaymentList";

const AdminPayment = () => {
  return (
    <div className="flex-1 pt-5 px-16 bg-yellow-100 ">
      <div className="text-black max-w-7xl  p-4 flex items-center justify-between ">
        <div className=" w-fit">
          <h1 className="text-4xl font-bold w-fit">Payment History</h1>
        </div>
        <div className="flex gap-4 ">
          <FilterForm />
          <PaymentForm />
        </div>
      </div>
      <div className="mt-4">{<PaymentList />}</div>
    </div>
  );
};
export default AdminPayment;
