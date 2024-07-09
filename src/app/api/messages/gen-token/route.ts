import { db, users } from '@/database/schema';
import { authOptions } from '@/utils/auth';
import { eq } from 'drizzle-orm';
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { StreamChat } from 'stream-chat';
export async function GET(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {    
    const session = await getServerSession(authOptions);
    console.log(session?.user)
    const user = await db.select({
      id:users.id,
      name:users.name,
      email:users.email,
      token:users.token,
    })
    .from(users)
    .where(eq(users.email,session?.user?.email as string))
    
    if(!user[0]){
      return NextResponse.json({error:"user not found"},{ status: 404 })
    }
    const serverClient = StreamChat.getInstance( process.env.GOSTREAM_KEY as string, process.env.GORSTRAM_SECRET_KEY as string);
    const token = serverClient.createToken(user[0].name ?? user[0].email);
    if(user[0]?.token){
      return NextResponse.json({token:user[0].token})
    }else{
      
    }
  } catch (error) {
    
  }
  return NextResponse.json({1:"ahoy"})
}