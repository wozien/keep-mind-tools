"use client";

import * as React from "react";
import type { DialogProps } from "@radix-ui/react-dialog";
import {
  Dialog as DialogRoot,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";

export type ComposeDialogProps = DialogProps & {
  trigger: React.ReactNode;
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
};

export const Dialog: React.FC<ComposeDialogProps> = ({
  trigger,
  title,
  description,
  children,
  footer,
  ...props
}) => {
  const renderHeader = () => {
    if (!title) return null;

    return (
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        {description && <DialogDescription>{description}</DialogDescription>}
      </DialogHeader>
    );
  };

  const renderFooter = () => {
    if (!footer) return null;
    return <DialogFooter>{footer}</DialogFooter>;
  };

  return (
    <DialogRoot {...props}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className="sm:max-w-[450px]">
        {renderHeader()}

        {children}

        {renderFooter()}
      </DialogContent>
    </DialogRoot>
  );
};
