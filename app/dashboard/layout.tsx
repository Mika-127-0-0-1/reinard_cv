import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Reinard's CV",
  description: "Admin dashboard",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
        <body className="antialiased">
        {children}
        </body>
      </html>
  );
}
