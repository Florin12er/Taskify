"use client"

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { deleteBoard } from "@/actions/delete-board";
import { useAction } from "@/hooks/use-action";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
    PopoverClose,
} from "@/components/ui/popover"
import { MoreHorizontal, Trash2, Undo2, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface BoardOptionsProps {
    id: string
}

export const BoardOptions = ({
    id
}: BoardOptionsProps) => {
    const router = useRouter()
    const { execute, isLoading } = useAction(deleteBoard, {
        onError: (error) => {
            toast.error(error)
        }
    })


    const onDelete = () => {
        execute({
            id
        })
    }
    const onGoBack = () => {
        router.push("/")
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className="h-auto w-auto p-2" variant="transparent">
                    <MoreHorizontal className="w-4 h-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="px-0 pt-3 pb-3" side="bottom" align="start">
                <div className="text-xs font-medium text-center text-neutral-600 pb-4">
                    Board Actions
                </div>
                <PopoverClose asChild>
                    <Button
                        className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
                        variant="ghost"
                    >
                        <X className="w-4 h-4" />
                    </Button>
                </PopoverClose>
                <Button
                    variant="secondary"
                    className="rounded-md w-full h-auto p-2 px-5 justify-start font-normal text-sm"
                    onClick={onGoBack}
                    disabled={isLoading}
                >
                    Go back to Boards
                    <Undo2 className="w-4 h-4 ml-auto" />
                </Button>
                <Button
                    variant="destructive"
                    onClick={onDelete}
                    disabled={isLoading}
                    className="rounded-md w-full h-auto p-2 px-5 justify-start font-normal text-sm"
                >Delete this board
                    <Trash2 className="w-4 h-4 ml-auto" />
                </Button>
            </PopoverContent>
        </Popover>
    )
};
