'use client'
import Link from "next/link";
import {NextPage} from "next";
import {useRouter, useSearchParams} from "next/navigation";
import {useEffect, useLayoutEffect} from "react";
import {useUserToken} from "@/app/zustand/userStore";

const NotFound: NextPage = () => {
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const pathname = window.location.pathname;

            if (pathname.includes('/oauth')) {
                const searchParams = new URLSearchParams(window.location.search);
                const accessToken = searchParams.get('accessToken');
                const refreshToken = searchParams.get('refreshToken');

                if (accessToken && refreshToken) {
                    window.localStorage.setItem('accessToken', accessToken);
                    window.localStorage.setItem('refreshToken', refreshToken);
                    router.push('/oauth');
                }
            } else {
                router.push('/');
            }
        }
    }, []);
    return (
        <div>
            <div>404 not found</div>
        </div>
    );
};

export default NotFound;
