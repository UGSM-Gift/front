import './globals.scss'
import Head from "next/head";

export const metadata = {
    title: '은근슨몰',
    description: 'UGSM',
    metadataBase: 'https://www.ugsm.co.kr',
    openGraph: {
        title: 'UGSM',
        type: 'website',
        url: 'https://www.ugsm.co.kr/',
        images: '/fire_craker_icon.svg',
    }
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {


    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}
