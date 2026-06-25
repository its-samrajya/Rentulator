"use server";

import prisma from "@/lib/prisma";
import { generateInvoice } from "./generateInvoice";
import { revalidatePath } from "next/cache";

export const generateAllInvoice = async () => {
  try {
    const tenants = await prisma.tenant.findMany({
      where: {
        electricMeter: {
          some: {
            electricBill: {
              some: { invoiceId: null },
            },
          },
        },
      },
    });
    for (const tenant of tenants) {
      await generateInvoice({ tenantId: tenant.id });
    }
    revalidatePath("/admin/invoice");
    revalidatePath("/");
    return { success: true, message: "All invoice generated successfully" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Invoice Creattion went wrong" };
  }
};
