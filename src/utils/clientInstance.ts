// this should be a single instance
import { StreamChat } from "stream-chat";

export const serverClient = StreamChat.getInstance(
  process.env.GOSTREAM_KEY as string,
  process.env.GORSTRAM_SECRET_KEY as string,
);