import { ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/commons/lib/utils"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog"

const actionButtonVariants = cva(
  "font-bold",
  {
    variants: {
      variant: {
        default: "bg-blue-700 text-primary-foreground hover:bg-blue-800/90",
        success: "bg-green-700 text-green-50 hover:bg-green-800/90",
        destructive: "text-red-800 border border-red-800 shadow-sm bg-red-100 hover:bg-red-200/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

type ActionDialogProps = {
  triggerComponent: ReactNode
  title: string
  description: ReactNode
  confirmText: string
  cancelText: string
  onConfirm: () => void
  confirmButtonVariant?: VariantProps<typeof actionButtonVariants>["variant"]
};

export const ActionDialog = ({
  triggerComponent,
  title,
  description,
  confirmText,
  cancelText,
  onConfirm,
  confirmButtonVariant = "default",
}: ActionDialogProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{triggerComponent}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription asChild>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelText}</AlertDialogCancel>
          <AlertDialogAction
            className={cn(actionButtonVariants({ variant: confirmButtonVariant }))}
            onClick={onConfirm}
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}