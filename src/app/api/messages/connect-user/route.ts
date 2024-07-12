import { db, users } from "@/database/schema";
import { authOptions } from "@/utils/auth";
import { eq } from "drizzle-orm";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { StreamChat } from "stream-chat";
import { serverClient } from "@/utils/clientInstance";
import { randomInt } from "crypto";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        image: users.image,
        token: users.token,
      })
      .from(users)
      .where(eq(users.email, session.user.email as string));

    if (!user[0]) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const connectedUser = await serverClient.connectUser(
      {
        id: user[0].id,
        name: user[0].name || `random pumpkin #${randomInt(10 ,10000)}`,
        image: user[0],
      },
      user[0].token
    );

    if (connectedUser) {
      return NextResponse.json({ message: "user is connected" }, { status: 200 });
    } else {
      return NextResponse.json({ error: "issue with connecting user" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
