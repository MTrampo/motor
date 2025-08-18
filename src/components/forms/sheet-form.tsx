'use client'

import { ReactNode, RefObject, useState } from "react";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import { FaCircleCheck } from "react-icons/fa6";
import { toast } from "sonner";

export type SheetFormRef = {
  onSubmit: () => void
  isValid?: boolean
  errMessage?: string
}

type SheetFormProps = {
  title?: ReactNode
  description?: string
  formComponent: ReactNode
  triggerComponent: ReactNode
  formRef: RefObject<SheetFormRef | null>
}

export function SheetForm({ triggerComponent, title, description, formComponent, formRef }: SheetFormProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)

  function handleActions() {
    setIsDisabled(false)
    setIsOpen(false)
  }
  
  const handleTriggerSubmit = () => {
    if (!formRef.current?.isValid) {
      toast.error('Ação Negada', {
        description: formRef.current?.errMessage,
        duration: 5000
      })
      return
    }
    setIsDisabled(true)
    formRef.current?.onSubmit()
    handleActions();
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
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
            <Button variant='success' className="w-full gap-2" onClick={handleTriggerSubmit} disabled={isDisabled}>
              FINALIZAR ORÇAMENTO <FaCircleCheck />
            </Button>
          </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}