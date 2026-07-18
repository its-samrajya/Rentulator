import { getAllTenantForAdmin } from "@/lib/queries/tenants";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { TenantTableRow } from "./TenantTableRow";
import { getAllRoomsWithOccupancy } from "@/lib/queries/occupancy";
import { Users } from "lucide-react";

const TenantList = async () => {
  const tenants = await getAllTenantForAdmin();
  const allRooms = await getAllRoomsWithOccupancy();

  return (
    <Card className="border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
          <Users className="h-4 w-4" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-slate-900">Tenants</h2>
          <p className="text-xs text-slate-400">
            {tenants.length} {tenants.length === 1 ? "tenant" : "tenants"} total
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-200 hover:bg-transparent">
              <TableHead className="h-10 w-25 px-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Name
              </TableHead>
              <TableHead className="h-10 px-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                Floor
              </TableHead>
              <TableHead className="h-10 px-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                Room_No
              </TableHead>
              <TableHead className="h-10 px-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                Meter_No
              </TableHead>
              <TableHead className="h-10 px-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                <div>Action</div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tenants.length === 0 ? (
              <TableRow className="border-transparent hover:bg-transparent">
                <TableCell
                  colSpan={5}
                  className="py-10 text-center text-sm text-slate-400"
                >
                  No tenants yet. Add your first tenant to get started.
                </TableCell>
              </TableRow>
            ) : (
              tenants.map((tenant) => (
                <TenantTableRow
                  key={tenant.id}
                  tenant={tenant}
                  allRooms={allRooms}
                />
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default TenantList;
