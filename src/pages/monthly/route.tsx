import dayjs, { Dayjs } from "dayjs";
import { useMemo, useState } from "react";
import { days } from "../../constants";

// const today = dayjs("2024-07-18");
const today = dayjs();

const units = ["month", "year"] as const;
const selectedUnit = units[0];

interface MonthDate {
  date: Dayjs;
  isPrevMonth: boolean;
  isNextMonth: boolean;
  isToday: boolean;
}

export default function MonthlyCalendar() {
  const [marker, setMarker] = useState(today);

  const [selectedDay, setSelectedDay] = useState(today);

  const dayGrid = useMemo(() => {
    //
    const startOfMonth = marker.startOf("month");
    const startDay = startOfMonth.day();

    const endOfMonth = marker.endOf("month");
    const endDay = endOfMonth.day();

    const daysInMonth = marker.daysInMonth();

    const _dayGrid: MonthDate[][] = [];

    for (let i = 0 - startDay; i < daysInMonth + (6 - endDay); i++) {
      if (i < 0) {
        (_dayGrid[0] ??= []).push({
          date: startOfMonth.add(i, "day"),
          isPrevMonth: true,
          isNextMonth: false,
          isToday: false,
        });
        continue;
      }
      if (i >= daysInMonth) {
        (_dayGrid[_dayGrid.length - 1] ??= []).push({
          date: startOfMonth.add(i, "day"),
          isPrevMonth: false,
          isNextMonth: true,
          isToday: false,
        });
        continue;
      }
      const day = startOfMonth.add(i, "day");
      const weekIndex = Math.floor((startDay + i) / 7);

      (_dayGrid[weekIndex] ??= []).push({
        date: day,
        isPrevMonth: false,
        isNextMonth: false,
        isToday: day.isSame(today, "day"),
      });
    }

    return _dayGrid;
  }, [marker]);

  const monthLabel = marker.format("MMMM YYYY");

  const increment = () => setMarker(marker.add(1, selectedUnit));
  const decrement = () => setMarker(marker.subtract(1, selectedUnit));

  return (
    <div className="month-container">
      <div className="week-controls-container">
        <div className="week-controls">
          <h1>{monthLabel}</h1>
          <div className="flex-row">
            <button onClick={decrement}>Previous</button>
            <h5 style={{ textTransform: "uppercase" }}>{selectedUnit}</h5>
            <button onClick={increment}>Next</button>
          </div>
        </div>
        <div className="card-header-container">
          {days.map((day) => (
            <div key={day} className="card-header-month">
              <h4>{day}</h4>
            </div>
          ))}
        </div>
      </div>

      <div style={{ width: "100%" }}>
        {dayGrid.map((week, wi) => {
          return (
            <div className="week-row" key={wi}>
              {week.map((day, i) => {
                const disabled = day.isPrevMonth || day.isNextMonth;

                const isSelected = day.date.isSame(selectedDay, "day");

                return (
                  <div
                    key={days[i] + wi}
                    className={`card card-short ${
                      disabled ? "card-disabled" : ""
                    }`}
                    style={{
                      backgroundColor: isSelected ? "#ade8f4" : undefined,
                    }}
                    onClick={() => (disabled ? null : setSelectedDay(day.date))}
                    role="button"
                  >
                    <div className="card-body-short">
                      <h3
                        style={{
                          fontSize: "2rem",
                          color: day.isToday
                            ? "#f4a261"
                            : disabled
                            ? "#e0e1dd"
                            : "initial",
                        }}
                      >
                        {String(day.date.date()).padStart(2, "0")}
                        {/* {day.date.format("DD/MM/YYYY")} */}
                      </h3>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
