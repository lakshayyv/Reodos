import { default as NativeLink } from "next/link";

export function Link({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <NativeLink className="text-sm hover:text-primary" href={href}>
      {children}
    </NativeLink>
  );
}
