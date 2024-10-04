"use client";

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport
} from "@/components/ui/toast";
import { ToastType, useToast } from "@/hooks/useToast";
import { CircleCheck, ClipboardCheck } from "lucide-react";

interface ToastProps {
  type?: ToastType;
  icon?: React.ReactNode;
  bgColor?: string;
}

export const Toaster: React.FC<ToastProps> = (props) => {
  const { toasts } = useToast();

  const getToastType = (type: ToastType | undefined) => {
    switch (type) {
      case "clipboard":
        return {
          icon: <ClipboardCheck />,
          bgColor: props.bgColor
        };
      case "error":
        return {
          icon: props.icon,
          bgColor: props.bgColor
        };

      default:
        return {
          icon: <CircleCheck width={20} height={20} />,
          bgColor: props.bgColor
        };
    }
  };

  return (
    <ToastProvider duration={2000} swipeDirection="up">
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              <div className="flex justify-start items-center gap-2">
                {getToastType(props.toastType).icon}
                {title && <ToastTitle>{title}</ToastTitle>}
              </div>
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            {props.close && <ToastClose />}
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
};
