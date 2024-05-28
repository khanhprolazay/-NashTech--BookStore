import { Roboto } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import Head from "next/head";

const roboto = Roboto({ 
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "700", "900"]
 });

export const metadata = {
  title: "Bookworm",
  description: "The popular book selling platform ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      <body className={roboto.className}>
        <AntdRegistry>
          {children}
        </AntdRegistry>
      </body>
    </html>
  );
}

