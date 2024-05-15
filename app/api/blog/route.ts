import { setBlogData } from "@/lib/utils/blog";

export async function POST(req: Request) {
  const body = await req.json();
  console.log(body);
    const docID = await setBlogData(body);
    console.log("doc id isssssssssss",docID)
  return Response.json(
    { message: "blog added successfully", docID },
    { status: 200 }
  );
}
