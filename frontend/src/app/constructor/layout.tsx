export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function ConstructorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 