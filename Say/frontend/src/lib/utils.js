export const formattedMessageDate = (date) => {
  if (!date || isNaN(new Date(date).getTime())) {
    return "Fecha no válida";
  }
  return new Date(date).toLocaleString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};


// Función para formatear las fechas según el día, mes y año y organizar los mensajes del chat
export const formatDate = (date) => {
  const today = new Date();
  const targetDate = new Date(date);

  // Comparaciones de fechas
  const isSameDay = today.toDateString() === targetDate.toDateString();
  const isYesterday =
    today.getDate() - targetDate.getDate() === 1 &&
    today.getMonth() === targetDate.getMonth() &&
    today.getFullYear() === targetDate.getFullYear();

  const getStartOfWeek = (date) => {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Lunes primer día de la semana
    return new Date(date.setDate(diff));
  };

  const startOfWeek = getStartOfWeek(new Date(today));
  const startOfTargetWeek = getStartOfWeek(new Date(targetDate));

  // Si es el mismo día muestra el texto hoy
  if (isSameDay) {
    return "Hoy";
  }

  // Si es ayer muestra el texto ayer
  if (isYesterday) {
    return "Ayer";
  }

  // Si es de la misma semana mostrará solo el día de la semana (ej Sábado)
  if (startOfWeek.toDateString() === startOfTargetWeek.toDateString()) {
    const dayOfWeek = targetDate.toLocaleString("es-ES", { weekday: "long" });
    return `${dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1)}`;
  }

  // Si es de otra semana del mismo año mostrará el dia de la semana día del mes y mes (ej Sabado, 18 de enero)
  if (today.getFullYear() === targetDate.getFullYear()) {
    const dayOfWeek = targetDate.toLocaleString("es-ES", { weekday: "long" });
    const dayOfMonth = targetDate.getDate();
    const month = targetDate.toLocaleString("es-ES", { month: "long" });
    return `${dayOfWeek}, ${dayOfMonth} ${month}`;
  }

  // Si es de otro año mostrará el día de la semana, el día del mes, el mes y el año (ej Sábado 18 de enero de 2024)
  const dayOfWeek = targetDate.toLocaleString("es-ES", { weekday: "long" });
  const dayOfMonth = targetDate.getDate();
  const month = targetDate.toLocaleString("es-ES", { month: "long" });
  const year = targetDate.getFullYear();
  return `${dayOfWeek}, ${dayOfMonth} de ${month} de ${year}`;
};
