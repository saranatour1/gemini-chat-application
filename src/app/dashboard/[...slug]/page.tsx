import { Main } from "@/components/Content/Main";
import { Id } from "../../../../convex/_generated/dataModel";

interface Slug {
  slug: Id<"threads">[];
}

interface Props {
  params: Promise<Slug>;
}

export default async function page({ params }: Props) {
  const { slug: Ids } = await params;
  return <Main threadId={Ids ?? []} />;
}
