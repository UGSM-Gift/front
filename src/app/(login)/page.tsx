import {Inter} from 'next/font/google';
import Login from "@/app/(login)/login/page";

const inter = Inter({subsets: ['latin']})

const LoginHome = () => {



    return <Login/>;
};

export default LoginHome;