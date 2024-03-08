'use client'
import Link from "next/link";
import {NextPage} from "next";
import {useRouter, useSearchParams} from "next/navigation";

const NotFound: NextPage = () => {
    const pathname = window.location.pathname;

    const router = useRouter()
    const searchParams = useSearchParams();


    if (pathname.includes('/oauth')) {
        const accessToken = searchParams.get('accessToken');
        const refreshToken = searchParams.get('refreshToken');

        if (accessToken && refreshToken) {
            window.localStorage.setItem('accessToken', accessToken);
            window.localStorage.setItem('refreshToken', refreshToken);
            router.push('/oauth');
        }

    } else {
        router.push('/')
    }

    return (
        <div>
            <div>404 not found</div>
        </div>
    )
}

export default NotFound;