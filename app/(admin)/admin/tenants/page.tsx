import { Button } from "@/components/ui/button";

const AdminTenants = () => {
  return (
    <div className="flex-1 pt-5 px-16 bg-yellow-100 ">
      <div className="text-black max-w-7xl  p-4 flex items-center justify-between ">
        <div className=" w-fit">
          <h1 className="text-4xl font-bold w-fit">Tenants</h1>
        </div>
        <div>
          <Button className="bg-blue-500 text-base" size="lg">
            + Add Tenant
          </Button>
        </div>
      </div>
      <div className="flex mt-4 px-4 justify-between"></div>
    </div>
  );
};
export default AdminTenants;
