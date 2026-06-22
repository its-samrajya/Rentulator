import { Button } from "@/components/ui/button";
import { getTenants } from "@/lib/queries/tenants";
import { DropdownMenuDestructive } from "./DropdownActions";

const TenantList = async () => {
  const tenants = await getTenants();
  console.log("the tenant data is ", tenants);

  return (
    <div className="grid grid-cols-3 gap-6">
      {tenants.map((tenant) => (
        <div
          key={tenant.id}
          className="p-6 bg-white gap-6 rounded-md shadow-lg"
        >
          <div className="flex items-center justify-between border-b pb-3">
            <div className="flex gap-4 items-center ">
              <div className="rounded-full p-2 size-10 flex items-center justify-center border-2">
                {tenant.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col">
                <span className="font-bold">{tenant.name}</span>
                <span className="font-light text-sm text-gray-300">
                  {tenant.rooms[0]?.floor}
                </span>
              </div>
            </div>
            {/* <button className="cursor-pointer"> */}
            {/*   <Ellipsis /> */}
            {/* </button> */}
            <DropdownMenuDestructive />
          </div>
          <div className="flex flex-col mt-4">
            <div className="flex justify-between">
              <span>Rent Amount</span>
              <span>{tenant.invoices?.[0]?.totalAmount || 0} </span>
            </div>
            <div className="flex justify-between">
              <span>Due Date</span>
              <span>
                {tenant.invoices?.[0]?.dueDate.toLocaleDateString() ||
                  "not yet"}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Status</span>
              <span>{tenant.invoices?.[0]?.status || "not yet"}</span>
            </div>
          </div>
          <div className="text-center">
            <Button>Remind</Button>
          </div>
        </div>
      ))}
    </div>
  );
};
export default TenantList;
