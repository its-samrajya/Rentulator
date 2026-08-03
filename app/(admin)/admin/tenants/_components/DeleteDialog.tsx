"use client";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "react-toastify";
import { removeTenant } from "@/actions/removeTenant";

interface Props {
  tenantId: string;
  tenantName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const DeleteTenantDialog = ({
  tenantId,
  tenantName,
  open,
  onOpenChange,
}: Props) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    const result = await removeTenant(tenantId);
    setLoading(false);

    if (result.success) {
      onOpenChange(false);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete {tenantName}?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently remove {tenantName} and free up any rooms they
            currently occupy. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={loading}
            onClick={(e) => {
              e.preventDefault(); // stop default close so we control it after the async call
              handleDelete();
            }}
          >
            {loading ? "Removing..." : "Remove"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
