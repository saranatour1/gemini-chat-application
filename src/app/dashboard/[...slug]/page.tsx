import { Main } from "@/components/Content/Main";
import { Id } from "../../../../convex/_generated/dataModel";


export default function page({ params }: { params: { slug: Id<"threads">[] } }){
  return(<>
      <Main threadId={params.slug}/>
      {/* {params.slug} */}
  </>)
}