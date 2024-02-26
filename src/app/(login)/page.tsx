import {Inter} from 'next/font/google'
import DefaultButton from "@/app/_component/DefaultButton";
import DefaultInput from "@/app/_component/DefaultInput";
import Login from "@/app/(login)/login/page";

const inter = Inter({subsets: ['latin']})

export default function LoginHome() {
    return (
            <Login/>
    )
}
