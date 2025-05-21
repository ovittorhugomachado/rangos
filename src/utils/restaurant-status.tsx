import { DayOfWeek, RestaurantData } from "../types/restaurante-data-types.d";

export const getRestaurantStatus = (
  openingHours: RestaurantData['openingHours']
) => {
  const days: DayOfWeek[] = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
  const currentDayIndex = new Date().getDay();
  const currentDay = days[currentDayIndex];

  const todaySchedule = openingHours.find(s => s.day === currentDay);

  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes();

  if (!todaySchedule || todaySchedule.isClosed) {
    return findNextOpenDay(currentDayIndex, openingHours);
  }

  const [openHour, openMinute] = todaySchedule.open.split(':').map(Number);
  const [closeHour, closeMinute] = todaySchedule.close.split(':').map(Number);
  const openTime = openHour * 60 + openMinute;
  const closeTime = closeHour * 60 + closeMinute;

  if (currentTime < openTime) {
    return {
      isOpen: false,
      message: `Abre hoje às ${todaySchedule.open}`,
    };
  } else if (currentTime >= closeTime) {
    return findNextOpenDay(currentDayIndex, openingHours);
  } else {
    return {
      isOpen: true,
      message: `Fecha às ${todaySchedule.close}`,
    };
  }
};

const findNextOpenDay = (
  startIndex: number,
  openingHours: RestaurantData['openingHours']
) => {
  const days: DayOfWeek[] = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];

  for (let i = 1; i <= 7; i++) {
    const nextIndex = (startIndex + i) % 7;
    const nextDay = days[nextIndex];
    const schedule = openingHours.find(
      s => s.day === nextDay && !s.isClosed
    );

    if (schedule) {
      return {
        isOpen: false,
        message: `Abre ${capitalize(nextDay)} às ${schedule.open}`,
      };
    }
  }

  return { isOpen: false, message: 'Fechado por tempo indeterminado' };
};

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);