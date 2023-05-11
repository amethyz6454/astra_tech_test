import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Online Votes",
    description: "This year's Online Votes",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className} suppressHydrationWarning={true}>
                {children}
            </body>
        </html>
    );
}
