import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import {useEffect, useState} from "react";
import './calendar.scss';
import NavLayout from "@/app/(main)/_component/NavLayout";
import Image from "next/image";
import {useTestStore} from "@/app/zustand/testStore";

dayjs.locale('ko');

interface TestElement {
    year: string;
    month: string;
    day: string;
    select: boolean;
}

const Calendar = () => {

    const [today, setToday] = useState(dayjs());
    const [currentMonth, setCurrentMonth] = useState(dayjs());

    const daysInMonth = currentMonth.daysInMonth();
    const firstDayOfMonth = dayjs(currentMonth).startOf('month').locale('ko');

    const dayStartOfMonth = dayjs(currentMonth).startOf('month').day();


    const changeDayForm = (day: string) => {
        if (day.length === 1) {
            return `0${day}`
        }
        return day
    }



    const [makeTestArr, setMakeTestArr] = useState<TestElement[]>([{year: '', month: '', day: '', select: false}]);


    useEffect(() => {
        const startRender = () => {
            let arr = [];
            for (let i = 1; i <= firstDayOfMonth.day(); i++) {
                arr.push({year: '', month: '', day: '', select: false});
            }

            for (let i = 0; i < daysInMonth; i++) {
                arr.push({
                    year: currentMonth.format('YY'),
                    month: currentMonth.format('MM'),
                    day: changeDayForm(String(Number(dayjs(currentMonth).startOf('month').format('DD')) + Number(i))),
                    select: false
                });
            }
            return arr;
        }

        setMakeTestArr(startRender());
    }, [currentMonth, daysInMonth, firstDayOfMonth]);



    const prevMonth = () => {
        setCurrentMonth((prev) => prev.subtract(1, 'month'));
    }

    const nextMonth = () => {
        setCurrentMonth((prev) => prev.add(1, 'month'));
    }


    const eventDay = useTestStore(state => state.eventDay); // 상태 구독

    const calendarDayClassName = (date: TestElement) => {
        const currentDay = Number(`${today.format('YYMMD')}`)
        const calendarDay = Number(`${date.year}${date.month}${date.day}`)

        console.log(currentDay, calendarDay, date.month)
        if (currentDay > calendarDay) {
            // 현재 날짜 이전
            return `gray__color__40 calendar__day`
        } else if (currentDay === calendarDay) {
            // 현재 날짜
            return `gray__color__100 calendar__current_day calendar__day`;
        }

        // if (eventDay === calendarDay) {
        //     선택된 날짜
            // return ` gray__color__60  calendar__day calendar__select_day`;
        // }

        return ` gray__color__100 calendar__day `;

    }


    const selectDayClassName = (date: TestElement) => {
        const calendarDay = Number(`${date.year}${date.month}${date.day}`)

        if (eventDay !== 0 && eventDay === calendarDay) {
        //     선택된 날짜
            return ` gray__color__60  calendar__day calendar__select_day`;
        }
    }


    const clickDay = (date: TestElement) => {
        const calendarDay = Number(`${date.year}${date.month}${date.day}`)
        useTestStore.setState({eventDay: calendarDay});
    }


    const testing = () => {

        console.log(today.day(), today.month(), today.year(), dayjs(), today.format('YYYYMMD'),)
    }
    return (
        <div>
            <article className={'calendar__nav__layout'}>
                <div onClick={prevMonth}>
                    <Image src={'calendar_left_icon.svg'} alt={'<'} width={24} height={24}/>
                </div>
                <h4 className={'pl_8 pr_8 gray__color__100'}>{currentMonth.format('MM')}월</h4>
                <div onClick={nextMonth}>
                    <Image src={'calendar_right_icon.svg'} alt={'<'} width={24} height={24}/>
                </div>
            </article>
            <div className={'calendar__grid'}>
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((item, index) => (
                    <div key={index}
                         className={item === 'S' ? 'calendar__day primary__color__500' : "gray__color__60 calendar__day"}>
                        {item}
                    </div>
                ))}
            </div>
            <div className={'calendar__grid'}>
                {makeTestArr.map((date, index) => (
                    <div key={index} onClick={() => clickDay(date)}
                         className={`${calendarDayClassName(date)} ${selectDayClassName(date)}`}
                    >
                        {
                            date.day.startsWith('0') ? date.day.substring(1) : date.day
                        }
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Calendar;
