
export async function GET(request,{params}) {
  const response = (await params).slug;
  return Response.json(response);
}