import { AppSidebar } from "@/components/app-sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-screen">
      <div className="flex w-full p-4">
        <AppSidebar />
        {children}
      </div>
    </div>
  );
}
