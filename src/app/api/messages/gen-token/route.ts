import { db, users } from "@/database/schema";
import { authOptions } from "@/utils/auth";
import { eq } from "drizzle-orm";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { StreamChat } from "stream-chat";

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
        token: users.token,
      })
      .from(users)
      .where(eq(users.email, session.user.email as string));

    if (!user[0]) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const serverClient = StreamChat.getInstance(
      process.env.GOSTREAM_KEY as string,
      process.env.GORSTRAM_SECRET_KEY as string
    );

    if (user[0].token) {
      return NextResponse.json({ token: user[0].token });
    }

    const newToken = serverClient.createToken(session.user.email as string);
    const updatedUser = await db
      .update(users)
      .set({ token: newToken })
      .where(eq(users.email, session.user.email as string))
      .returning({ token: users.token });

    if (!updatedUser[0]) {
      return NextResponse.json({ error: "Failed to update user token" }, { status: 500 });
    }

    return NextResponse.json({ token: updatedUser[0].token }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
