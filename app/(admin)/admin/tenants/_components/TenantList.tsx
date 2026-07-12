import { getAllTenantForAdmin } from "@/lib/queries/tenants";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DropdownMenuDestructive } from "./DropdownActions";
import { TenantTableRow } from "./TenantTableRow";
import { getAllRoomsWithOccupancy } from "@/lib/queries/occupancy";

const TenantList = async () => {
  const tenants = await getAllTenantForAdmin();
  const allRooms = await getAllRoomsWithOccupancy();

  return (
    <div className="bg-white mt-6 p-3  shadow-lg rounded-md">
      <h2 className="text-base font-semibold text-gray-900 mb-4 mt-2 px-2">
        Tenants
      </h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-25">Name</TableHead>
            <TableHead className="text-right">Floor</TableHead>
            <TableHead className="text-right">Room_No</TableHead>
            <TableHead className="text-right">Meter_No</TableHead>
            <TableHead className="text-right ">
              <div>Action</div>{" "}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tenants.map((tenant) => (
            <TenantTableRow
              key={tenant.id}
              tenant={tenant}
              allRooms={allRooms}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
export default TenantList;
