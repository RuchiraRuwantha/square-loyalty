import '../styles/globals.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white min-h-screen flex flex-col">
        <main className='flex-1 overflow-auto'>{children}</main>
      </body>
    </html>
  );
}
