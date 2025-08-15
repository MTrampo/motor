import { ReactNode } from "react";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import { FaCircleCheck } from "react-icons/fa6";

type SheetFormProps = {
  title?: ReactNode
  description?: string
  formComponent: ReactNode
  triggerComponent: ReactNode
}

export function SheetForm({ triggerComponent, title, description, formComponent }: SheetFormProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        {triggerComponent}
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px] md:w-2xl" onInteractOutside={(e) => e.preventDefault()}>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>
            {description}
          </SheetDescription>
        </SheetHeader>
          <div className="flex-1 overflow-y-auto p-4">
            {formComponent}
          </div>
          <SheetFooter>
            <Button variant='success' className="w-full gap-2">
              FINALIZAR ORÇAMENTO <FaCircleCheck />
            </Button>
          </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}