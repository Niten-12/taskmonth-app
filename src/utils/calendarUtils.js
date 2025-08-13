import { format } from "date-fns";

export const generateCalendar = (year, month) => {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();

  let dates = [];

  // Previous month
  for (let i = firstDay - 1; i >= 0; i--) {
    dates.push({
      day: prevMonthDays - i,
      month: month - 1 < 0 ? 11 : month - 1,
      year: month - 1 < 0 ? year - 1 : year,
      isCurrentMonth: false,
    });
  }

  // Current month
  for (let i = 1; i <= daysInMonth; i++) {
    dates.push({
      day: i,
      month,
      year,
      isCurrentMonth: true,
    });
  }

  // Next month to fill grid
  const cellsToAdd = 42 - dates.length;
  for (let i = 1; i <= cellsToAdd; i++) {
    dates.push({
      day: i,
      month: (month + 1) % 12,
      year: month + 1 > 11 ? year + 1 : year,
      isCurrentMonth: false,
    });
  }

  return dates;
};

export const getCategoryColor = (category) => {
  switch (category) {
    case "To Do":
      return "#3498db";
    case "In Progress":
      return "#e67e22";
    case "Review":
      return "#9b59b6";
    case "Completed":
      return "#2ecc71";
    default:
      return "#bdc3c7";
  }
};

export const formatDate = (year, month, day) => {
  return format(new Date(year, month, day), "yyyy-MM-dd");
};
