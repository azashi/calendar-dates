import dayjs from "dayjs";
import { useState } from "react";
import { days } from "../../constants";

// const today = dayjs("2024-07-18");
const today = dayjs();

const units = ["week", "month", "year"] as const;
const selectedUnit = units[0];

export default function WeeklyCalendar() {
  const [marker, setMarker] = useState(today);

  const [selectedIndex, setSelectedIndex] = useState(today.day());

  const startOfWeek = marker.startOf("week");

  const week = Array.from({ length: 7 }, (_, i) => startOfWeek.add(i, "day"));

  const monthLabel = marker.format("MMMM YYYY");

  const increment = () => setMarker(marker.add(1, selectedUnit));
  const decrement = () => setMarker(marker.subtract(1, selectedUnit));

  return (
    <div className="week-container">
      <div className="week-controls">
        <h1>{monthLabel}</h1>
        <div className="flex-row">
          <button onClick={decrement}>Previous</button>
          <h5 style={{ textTransform: "uppercase" }}>{selectedUnit}</h5>
          <button onClick={increment}>Next</button>
        </div>
      </div>
      <div className="week-row">
        {week.map((day, i) => {
          const isToday = day.isSame(today, "day");

          const isSelected = i === selectedIndex;

          return (
            <div
              key={days[i]}
              className="card"
              style={{ backgroundColor: isSelected ? "#ade8f4" : undefined }}
              // onClick={() => setSelectedIndex(i)}
              onClick={() => setSelectedIndex(day.day())}
              role="button"
            >
              <div className="card-header">
                <h4>{days[i]}</h4>
              </div>
              <div className="card-body">
                <h3
                  style={{
                    fontSize: "3rem",
                    color: isToday ? "#f4a261" : "initial",
                  }}
                >
                  {/* {String(day.date()).padStart(2, "0")} */}
                  {day.format("DD")}
                </h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
