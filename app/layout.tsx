import type { Metadata } from "next";
 
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={``}
      >
        {children}
      </body>
    </html>
  );
}

//NEXT_PUBLIC_WEATHER_KEY = 402d7bcffdd39c5acbb0c9b7f4f30984
