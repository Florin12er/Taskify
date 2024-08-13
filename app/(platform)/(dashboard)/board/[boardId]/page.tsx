import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ListContainer } from "./_componets/list-container";

interface BoardIdPageProps {
    params: {
        boardId: string;
    };
}

const BoardIdPage = async ({ params }: BoardIdPageProps) => {
    const { orgId } = auth();

    if (!orgId) {
        return redirect("/select-org");
    }

    const lists = await db.list.findMany({
        where: {
            boardId: params.boardId,
            board: {
                orgId,
            },
        },
        include: {
            cards: {
                orderBy: {
                    order: "asc",
                },
            },
        },
        orderBy: {
            order: "asc",
        },
    });

    return (
        <div className="p-4 h-full">
            <ListContainer boardId={params.boardId} data={lists} />
        </div>
    );
};

export default BoardIdPage;
