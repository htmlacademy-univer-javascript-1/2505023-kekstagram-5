function isMeetingWithinWorkDay(workDayStart, workDayEnd, meetingStart, meetingDuration) {
  // Преобразуем время в минуты
  function timeToMinutes(time) {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  const workDayStartMinutes = timeToMinutes(workDayStart);
  const workDayEndMinutes = timeToMinutes(workDayEnd);

  const meetingStartMinutes = timeToMinutes(meetingStart);

  const meetingEndMinutes = meetingStartMinutes + meetingDuration;

  return meetingStartMinutes >= workDayStartMinutes && meetingEndMinutes <= workDayEndMinutes;
}

isMeetingWithinWorkDay('08:00', '17:30', '14:00', 90);
isMeetingWithinWorkDay('8:0', '10:0', '8:0', 120);
isMeetingWithinWorkDay('08:00', '14:30', '14:00', 90);
isMeetingWithinWorkDay('14:00', '17:30', '08:0', 90);
isMeetingWithinWorkDay('8:00', '17:30', '08:00', 900);
