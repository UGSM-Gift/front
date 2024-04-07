'use client'
import'./notication.scss';
import {useRouter} from "next/navigation";
import NavLayout_default from "@/app/_component/NavLayout_default";

const Notication =()=>{


    const router = useRouter()
    const clickBack = () => {
        router.back()
    }

    return(
        <div>

            {/* shadow가 없는 Nav가 필요해서 하나 만들었어요 */}
            <NavLayout_default
                    centerText={'알림'}
                    leftIcon={'back'}
                    clickBack={clickBack}
            />
            <div className={"notication_contents__layout mt_16"}>
                {/* 알림 확인 전 */}
                <div className={"notication__layout notication_default"}>
                    <div className={"notication__layout_top caption__font gray__color__60"}>
                        <span className={"event_name "}>생일, 이벤트</span>
                        <span className={"noti_time"}> 1시간전 </span>
                    </div>
                    <div className={"noti_content mt_12"}>
                         {/*&#127873;*/}
                         이벤트명까지 일주일! 선물로 뭘 받아야하지? 선물 고르기 어렵다면? 추천 받아보자!
                    </div>
                </div>

                {/* 알림 확인 후 */}
                <div className={"notication__layout notication_selected"}>
                    <div className={"notication__layout_top caption__font gray__color__60"}>
                        <span className={"event_name"}>생일, 이벤트</span>
                        <span className={"noti_time"}> 1시간전 </span>
                    </div>
                    <div className={"noti_content mt_12"}>
                         {/*&#127873;*/}
                        이벤트명까지 일주일! 선물로 뭘 받아야하지? 선물 고르기 어렵다면? 추천 받아보자!
                    </div>

                </div>
            </div>



        </div>


    )
}

export default Notication