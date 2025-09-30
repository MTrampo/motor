import { ReactNode, RefObject, useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { toast } from "sonner";

export type DialogFormRef = {
  onSubmit: () => Promise<boolean | void>
}

type DialogFormProps = {
  title?: ReactNode
  buttonText: ReactNode
  description?: string
  formComponent: ReactNode
  triggerComponent: ReactNode
  formRef: RefObject<DialogFormRef | null>
}

export function DialogForm({ triggerComponent, title, description, buttonText, formComponent, formRef }: DialogFormProps) {
  const [open, setOpen] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)

  const handleTriggerSubmit = async () => {
    setIsDisabled(true);
    try {
      const success = await formRef.current?.onSubmit();
      if (success !== false) {
        setOpen(false)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsDisabled(false);
    }
  }

  return(
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {triggerComponent}
      </DialogTrigger>
      <DialogContent onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="flex gap-2 items-center">
            {title}
          </DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        <div>
          {formComponent}
        </div>
        <DialogFooter>
          <Button variant='success' className="w-full gap-2" onClick={handleTriggerSubmit} disabled={isDisabled}>
            {buttonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}