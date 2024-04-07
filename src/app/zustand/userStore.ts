import { create } from 'zustand';



interface UserTokenProps {
    accessToken: string
    refreshToken: string
}

export const useUserToken = create<UserTokenProps>((set)=> ({
    accessToken: '',
    refreshToken: '',
}))

