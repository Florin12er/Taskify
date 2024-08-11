"use client"

import { List } from "@prisma/client"

import { useAction } from "@/hooks/use-action"
import { toast } from "sonner"
import { deleteList } from "@/actions/delete-list"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
    PopoverClose,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Copy, MoreHorizontal, Plus, Trash2, X } from "lucide-react"
import { FormSubmit } from "@/components/form/form-submit"
import { Separator } from "@/components/ui/separator"
import { ElementRef, useRef } from "react"
import { copyList } from "@/actions/copy-list"


interface ListOptionsProps {
    data: List,
    onAddCard?: () => void
}

export const ListOptions = ({
    data,
    onAddCard
}: ListOptionsProps) => {
    const closeRef = useRef<ElementRef<"button">>(null)

    const { execute: executeDelete } = useAction(deleteList, {
        onSuccess: () => {
            toast.success(`List "${data.title}" deleted!`)
            closeRef.current?.click()
        },
        onError: (error) => {
            toast.error(error)
        }
    })
    const { execute: executeCopy } = useAction(copyList, {
        onSuccess: () => {
            toast.success(`List "${data.title}" copied`)
            closeRef.current?.click()
        },
        onError: (error) => {
            toast.error(error)
        }
    })


    const onDelete = (formData: FormData) => {
        const id = formData.get("id") as string
        const boardId = formData.get("boardId") as string
        executeDelete({
            id,
            boardId
        })
    }
    const onCopy = (formData: FormData) => {
        const id = formData.get("id") as string
        const boardId = formData.get("boardId") as string
        executeCopy({
            id,
            boardId
        })
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className="h-auto w-auto p-2" variant="ghost">
                    <MoreHorizontal className="w-4 h-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="px-0 pt-3 pb-3"
                side="bottom"
                align="start"
            >
                <div className="text-sm font-medium text-center text-neutral-600 pb-4">
                    List Actions
                </div>
                <PopoverClose ref={closeRef} asChild>
                    <Button
                        className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
                        variant="ghost"
                    >
                        <X className="w-4 h-4" />
                    </Button>
                </PopoverClose>
                <Button
                    onClick={onAddCard}
                    className="rounded-md w-full h-auto p-2 px-5 justify-start font-normal text-sm"
                    variant="ghost"
                >Add Card...
                    <Plus className="w-4 h-4 ml-auto" />
                </Button>
                <form action={onCopy}>
                    <input
                        hidden
                        name="id"
                        id="id"
                        value={data.id}
                    />
                    <input
                        hidden
                        name="boardId"
                        id="boardId"
                        value={data.boardId}
                    />
                    <FormSubmit
                        variant="ghost"
                        className="rounded-md w-full h-auto p-2 px-5 justify-start font-normal text-sm"
                    >
                        Copy List
                        <Copy className="w-4 h-4 ml-auto" />
                    </FormSubmit>
                </form>
                <Separator className="my-2 bg-black/20" />
                <form
                    action={onDelete}
                >
                    <input
                        hidden
                        name="id"
                        id="id"
                        value={data.id}
                    />
                    <input
                        hidden
                        name="boardId"
                        id="boardId"
                        value={data.boardId}
                    />
                    <FormSubmit
                        variant="destructive"
                        className="rounded-md w-full h-auto p-2 px-5 justify-start font-normal text-sm"
                    >
                        Delete This List
                        <Trash2 className="w-4 h-4 ml-auto" />
                    </FormSubmit>
                </form>

            </PopoverContent>
        </Popover>
    )
}

