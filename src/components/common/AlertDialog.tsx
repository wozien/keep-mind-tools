"use client";

import * as React from "react";
import {
  AlertDialog as AlertDialogRoot,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { AlertDialogProps } from "@radix-ui/react-alert-dialog";

export type ComposeAlertDialogProps = Omit<AlertDialogProps, "children"> & {
  trigger: React.ReactNode;
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
  onCancel?: () => void;
  onOk?: () => void;
};

export const AlertDialog: React.FC<ComposeAlertDialogProps> = ({
  trigger,
  title,
  description,
  onCancel,
  onOk,
  ...props
}) => {
  const handleConfirm = () => {
    if (onOk) onOk();
  };

  return (
    <AlertDialogRoot {...props}>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => onCancel && onCancel()}>
            取消
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>确定</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogRoot>
  );
};
