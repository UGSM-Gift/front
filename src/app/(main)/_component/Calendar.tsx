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

    const [calendar, setCalendar] = useState<number[][]>([[]]);
    const [currentMonth, setCurrentMonth] = useState<dayjs.Dayjs>(dayjs());


    useEffect(() => {
        generateCalendar(currentMonth);
    }, [currentMonth]);

    const generateCalendar = (selectedMonth: dayjs.Dayjs) => {
        const today = dayjs();
        const daysInMonth = selectedMonth.daysInMonth();
        const firstDayOfMonth = selectedMonth.startOf('month').day();
        const prevMonthDays = selectedMonth.subtract(1, 'month').daysInMonth();

        let date = 1;
        let tempCalendar: number[][] = [];

        // Generate calendar
        for (let i = 0; i < 6; i++) {
            let row: number[] = [];
            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < firstDayOfMonth) {
                    // Empty cells before the first day of the month
                    console.log(prevMonthDays, prevMonthDays - firstDayOfMonth + j + 1, )
                    row.push(0);
                } else if (date > daysInMonth) {
                    // Empty cells after the last day of the month
                    row.push(0);
                    date++;
                } else {
                    row.push(date);
                    date++;
                }
            }
            tempCalendar.push(row);
        }

        setCalendar(tempCalendar);
    };

    const goToPreviousMonth = () => {
        setCurrentMonth(currentMonth.subtract(1, 'month'));
    };

    const goToNextMonth = () => {
        setCurrentMonth(currentMonth.add(1, 'month'));
    };

    const isPreviousMonth = (day: number): boolean => {
        return currentMonth.isBefore(dayjs(), 'month') || (currentMonth.isSame(dayjs(), 'month') && day < dayjs().date());
    };

    const getCellStyle = (day: number) => {
        const today = dayjs();
        const isToday = day === today.date() && currentMonth.isSame(today, 'month');
        const isPast = day < today.date() && currentMonth.isSame(today, 'month');


        if (selectDay === day) {
            return 'calendar__day gray__color__60 calendar__select_day';
        }
        if (isToday) {
            return 'calendar__day primary__color__600';
        } else if (isPast || isPreviousMonth(day)) {
            return 'calendar__day gray__color__60';
        } else {
            return 'calendar__day gray__color__100';
        }
    };

    const [selectDay, setSelectDay] = useState(Number(currentMonth.format('D')))

    const selectClickDay = (day: number) => {
        setSelectDay(day)
        useTestStore.setState({eventDay: `${currentMonth.format('YYYY-MM')}-${day}`})
    }

    return (
        <div>
            <article className={'calendar__nav__layout'}>
                <div onClick={goToPreviousMonth}>
                    <Image src={'/calendar_left_icon.svg'} alt={'<'} width={24} height={24}/>
                </div>
                <h4 className={'pl_8 pr_8 gray__color__100'}>{currentMonth.format('MMMM YYYY')}월</h4>
                <div onClick={goToNextMonth}>
                    <Image src={'/calendar_right_icon.svg'} alt={'>'} width={24} height={24}/>
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

            <div className={'calendar__grid_week'}>
                {calendar.map((week, index) => (
                    <div key={index} className={'calendar__grid_day '}>
                        {week.map((day, idx) => (
                            <div key={idx}
                                className={getCellStyle(day)}
                                onClick={() => selectClickDay(day)}
                            >
                                {day === 0 ? '' : day}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Calendar;
