import { PaymentStatus } from "@/app/generated/prisma/enums";
import prisma from "../prisma";
import { InvoiceFilterStatus } from "../types";
import NepaliDate from "nepali-datetime";

export const getInvoices = async () => {
  const invoices = await prisma.invoice.findMany({
    include: {
      tenant: {
        include: {
          occupancies: {
            where: { moveOutDate: null },
            include: {
              room: true,
            },
          },
        },
      },
      payments: true,
    },
  });
  return invoices;
};

export const getInvoicesByFilter = async (status: InvoiceFilterStatus) => {
  const invoices = await prisma.invoice.findMany({
    where:
      status !== "all"
        ? {
            status:
              PaymentStatus[status.toUpperCase() as keyof typeof PaymentStatus],
          }
        : undefined,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      tenant: {
        include: {
          occupancies: {
            where: { moveOutDate: null },
            include: {
              room: true,
            },
          },
        },
      },
      payments: true,
      electricBill: {
        include: {
          electricMeter: true,
        },
      },
    },
  });
  return invoices;
};

export const getPayments = async () => {
  const payment = await prisma.payment.findMany({
    include: {
      invoice: {
        include: {
          tenant: true,
        },
      },
    },
  });
  return payment;
};

export const getUnpaidInvoicesByTenantId = async (tenantId: string) => {
  const unpaidInvoices = await prisma.invoice.findMany({
    where: {
      tenantId,
      status: "PENDING",
    },
    include: {
      electricBill: {
        include: {
          electricMeter: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
  return unpaidInvoices;
};
export const getSkippedUnpaidInvoicesByTenantId = async (tenantId: string) => {
  const unpaidInvoices = await prisma.invoice.findMany({
    where: {
      tenantId,
      status: "PENDING",
    },
    include: {
      electricBill: {
        include: {
          electricMeter: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
    skip: 1,
  });
  return unpaidInvoices;
};

export const getPaidInvoicesByTenantId = async (tenantId: string) => {
  const paidInvoices = await prisma.invoice.findMany({
    where: { tenantId, status: "PAID" },
    include: {
      electricBill: {
        include: {
          electricMeter: true,
        },
      },
      payments: true,
    },
    orderBy: { createdAt: "desc" },
  });
  return paidInvoices;
};

// to calculate total amount (expected) that will be receiving in the month for admin dashboard
export const getTotalExpectedCurrentMonth = async () => {
  const today = new NepaliDate(new Date());
  const year = today.getYear();
  const month = today.getMonth();

  const startDate = new NepaliDate(year, month, 1).getDateObject();

  let nextMonth = month + 1;
  let nextYear = year;

  if (nextMonth > 12) {
    nextMonth = 1;
    nextYear++;
  }

  const endDate = new NepaliDate(nextYear, nextMonth, 1).getDateObject();

  const invoices = await prisma.invoice.findMany({
    where: {
      dueDate: {
        gte: startDate,
        lte: endDate,
      },
    },
    select: { totalAmount: true, status: true },
  });
  return invoices;
};
// to calulate total collected amount for admin dashboard
export const getAllPaidInvoices = async () => {
  const today = new NepaliDate(new Date());
  const year = today.getYear();
  const month = today.getMonth();

  const startDate = new NepaliDate(year, month, 1).getDateObject();

  let nextMonth = month + 1;
  let nextYear = year;

  if (nextMonth > 12) {
    nextMonth = 1;
    nextYear++;
  }

  const endDate = new NepaliDate(nextYear, nextMonth, 1).getDateObject();

  const paidInvoices = await prisma.invoice.findMany({
    where: {
      status: "PAID",
      dueDate: {
        gte: startDate,
        lte: endDate,
      },
    },
    select: { totalAmount: true },
  });
  return paidInvoices;
};

export const getPendingInvoicesForPayment = async () => {
  const invoice = await prisma.invoice.findMany({
    where: { status: "PENDING" },
    include: { tenant: true, payments: true },
    orderBy: { dueDate: "asc" },
  });

  return invoice.map((invoice) => {
    const paid = invoice.payments.reduce((sum, p) => sum + p.amount, 0);
    return {
      id: invoice.id,
      tenantName: invoice.tenant.name,
      remaining: invoice.totalAmount - paid,
    };
  });
};
