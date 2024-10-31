import React, { useEffect, useRef, useState } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.css";
import { Russian } from "flatpickr/dist/l10n/ru.js";
import "../../style/DatePicker.scss";

import leftWeek from "../../img/left-week.png";
import rightWeek from "../../img/right-week.png";
import weekSelect from "flatpickr/dist/plugins/weekSelect/weekSelect";

const DatePicker = ({ onWeekChange, disableButtons }) => {
    const datePickerRef = useRef(null);
    const [weekRange, setWeekRange] = useState("");
    const [selectedDate, setSelectedDate] = useState(new Date());

    const calculateWeekRange = (date) => {
        const startOfWeek = new Date(date);
        const endOfWeek = new Date(date);
        startOfWeek.setDate(date.getDate() - date.getDay() + 1); // Пн
        endOfWeek.setDate(startOfWeek.getDate() + 6); // Вс

        const formatOptions = { day: "numeric", month: "long" };
        const startFormatted = startOfWeek.toLocaleDateString("ru-RU", formatOptions);
        const endFormatted = endOfWeek.toLocaleDateString("ru-RU", formatOptions);

        return `${startFormatted} – ${endFormatted}`;
    };

    useEffect(() => {
        const fpInstance = flatpickr(datePickerRef.current, {
            locale: Russian,
            plugins: [weekSelect({})],
            // onChange: function (selectedDates) {
            //     if (selectedDates.length > 0) {
            //         console.log("Selected date:", selectedDates[0]); // Это будет объект Date
            //         const selected = selectedDates[0];
            //         setSelectedDate(selected); // Устанавливаем как Date объект
            //         setWeekRange(calculateWeekRange(selected));
            //         if (onWeekChange) {
            //             onWeekChange(selected.toISOString()); // Передаем в формате ISO
            //         }
            //     }
            // },
            onChange: function (selectedDates) {
                if (selectedDates.length > 0) {
                    const selectedDate = selectedDates[0];
                    setSelectedDate(selectedDate); // Установка состояния внутри компонента DatePicker
                    if (onWeekChange) {
                        onWeekChange(selectedDate); // Вызов функции обратного вызова
                    }
                }
            }
        });

        return () => {
            fpInstance.destroy();
        };
    }, [onWeekChange]);

    useEffect(() => {
        setWeekRange(calculateWeekRange(selectedDate));
    }, [selectedDate]);

    const handlePrevWeek = () => {
        setSelectedDate((prev) => {
            const newDate = new Date(prev);
            newDate.setDate(prev.getDate() - 7);
            setWeekRange(calculateWeekRange(newDate));
            if (onWeekChange) {
                onWeekChange(newDate.toISOString()); // Передаем в формате ISO
            }
            return newDate;
        });
    };

    const handleNextWeek = () => {
        setSelectedDate((prev) => {
            const newDate = new Date(prev);
            newDate.setDate(prev.getDate() + 7);
            setWeekRange(calculateWeekRange(newDate));
            if (onWeekChange) {
                onWeekChange(newDate.toISOString()); // Передаем в формате ISO
            }
            return newDate;
        });
    };

    return (
        <div className="date-picker-wrapper">
            <input
                ref={datePickerRef}
                className="date-picker-input"
                placeholder="Выберите неделю"
                readOnly
                value={weekRange}
            />
            <div className="week-display">
                {/*<span className="week-range">{weekRange}</span>*/}
                <div className="week-navigation">
                    <button className="prev-week-btn" onClick={handlePrevWeek} disabled={disableButtons}>
                        <img src={leftWeek} alt={leftWeek}/>
                    </button>
                    <button className="next-week-btn" onClick={handleNextWeek} disabled={disableButtons}>
                        <img src={rightWeek} alt={rightWeek}/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DatePicker;
