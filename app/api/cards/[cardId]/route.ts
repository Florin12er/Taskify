import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { cardId: string } }) {
  try {
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.cardId) {
      return new NextResponse("Card ID is required", { status: 400 });
    }

    const card = await db.card.findUnique({
      where: {
        id: params.cardId,
      },
      include: {
        List: {
          select: {
            title: true,
          },
        },
      },
    });

    if (!card) {
      return new NextResponse("Card not found", { status: 404 });
    }

    return NextResponse.json(card);
  } catch (error) {
    console.error("Error fetching card:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
