import Head from 'next/head';

export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <Head>
        <link rel="icon" href="/logo.png" />
        <title>Mon site</title>
      </Head>
        <body>
          {children}
        </body>
      </html>
    );
  }