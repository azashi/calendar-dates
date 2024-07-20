import { Link, Navigate, Outlet } from "react-router-dom";

const calendarTypes = [
  {
    name: "Weekly",
    href: "/weekly",
  },
  {
    name: "Monthly",
    href: "/monthly",
  },
];

export default function HomeRoute() {
  return (
    <div className="container">
      <Navigate to="/weekly" />
      <div className="flex-row">
        <h1>Calendar</h1>
        <ul className="flex-row">
          {calendarTypes.map((calendarType) => (
            <li key={calendarType.name}>
              <Link to={calendarType.href}>
                <h3>{calendarType.name}</h3>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <Outlet />
    </div>
  );
}
