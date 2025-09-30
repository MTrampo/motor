import { ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority"
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
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

type InformationDialogProps = {
  triggerComponent: ReactNode
  title: string
  description: ReactNode
  buttonText: string
  confirmButtonVariant?: VariantProps<typeof actionButtonVariants>["variant"]
};

export const InformationDialog = ({
  triggerComponent,
  title,
  description,
  buttonText,
}: InformationDialogProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{triggerComponent}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription asChild>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{buttonText}</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}