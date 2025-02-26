import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { pathname } = new URL(request.url);
    const cardId = pathname.split("/")[4];

    const card = await db.card.findUnique({
      where: {
        id: cardId,
        List: {
          Board: {
            orgId,
          },
        },
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
    return new NextResponse("Internal Error", { status: 500 });
  }
}
