export default async function page({
  params,
}: {
  params: Promise<{ tableId: string }>;
}) {
  const { tableId } = await params;

  return <div>{tableId}</div>;
}
