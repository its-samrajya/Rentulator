import { AddMeterForm } from "./_components/AddMeterForm";
import MetersList from "./_components/MetersList";

const AdminMeters = async () => {
  return (
    <div className="min-h-full w-full bg-slate-100/60">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              Meters
            </h1>
          </div>
          <div className="w-full sm:w-auto">
            <AddMeterForm />
          </div>
        </div>
        <div className="mt-4">
          <MetersList />
        </div>
      </div>
    </div>
  );
};

export default AdminMeters;
