"use client"
import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"

export default function ExampleToastTrigger() {
    const handleSubmit = () => {
        toast({
        title: "Toast Title",
        description: "This is a toast message.",
        
        })
    }
  return (
    <Button
      onClick={() => {
    handleSubmit()}}
    >
      Show Toast
    </Button>
  )
}
