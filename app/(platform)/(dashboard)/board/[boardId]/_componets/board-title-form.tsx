"use client"
import { toast } from "sonner"
import { ElementRef, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Board } from "@prisma/client"
import { FormInput } from "@/components/form/form-input"
import { updateBoard } from "@/actions/update-board"
import { useAction } from "@/hooks/use-action"

interface BoardTitleFormProps {
    data: Board;
}

export const BoardTitleForm = ({
    data
}: BoardTitleFormProps
) => {

    const { execute } = useAction(updateBoard, {
        onSuccess: (updatedData) => {
            // Assuming updatedData contains the updated title
            const newTitle = updatedData.title;
            toast.success(`Board "${newTitle}" updated!`);
            setTitle(newTitle); // Update state with the new title
            disableEditing();
        },
        onError: (error) => {
            toast.error(error);
        }
    });
    const formRef = useRef<ElementRef<"form">>(null)
    const inputRef = useRef<ElementRef<"input">>(null)
    const [title, setTitle] = useState(data.title)

    const [isEditing, setIsEditing] = useState(false)

    const enableEditing = () => {
        setIsEditing(true)
        setTimeout(() => {
            inputRef.current?.focus()
            inputRef.current?.select()
        })
    }

    const disableEditing = () => {
        setIsEditing(false)
    }
    const onSubmit = (formData: FormData) => {
        const title = formData.get("title") as string

        execute({
            title,
            id: data.id
        })
    }

    const onBlur = () => {
        formRef.current?.requestSubmit()
    }

    if (isEditing) {
        return (
            <form
                ref={formRef}
                action={onSubmit}
                className="flex items-center gap-x-2"
            >
                <FormInput
                    id="title"
                    onBlur={onBlur}
                    ref={inputRef}
                    defaultValue={title}
                    className="text-lg font-bold px-[7px] py-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none"
                />
            </form>
        )
    }

    return (
        <Button
            onClick={enableEditing}
            variant="transparent"
            className="font-bold text-lg h-auto w-auto p-1 px-2"
        >
            {title}
        </Button>
    )
}
