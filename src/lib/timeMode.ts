// Time-based mode detection for the sanctuary

export type TimeMode = 'morning' | 'core';

export function getCurrentTimeMode(): TimeMode {
  const now = new Date();
  const hours = now.getHours();
  
  // Morning mode: 7:00 AM to 12:00 PM (noon)
  if (hours >= 7 && hours < 12) {
    return 'morning';
  }
  
  // Core mode: After 12:00 PM & Before 7:00 AM
  return 'core';
}

export function isNightTime(): boolean {
  const hours = new Date().getHours();
  // After 9 PM
  return hours >= 21 || hours < 7;
}

export function getTimeGreeting(): string {
  const hours = new Date().getHours();
  
  if (hours >= 5 && hours < 12) {
    return 'Good morning';
  } else if (hours >= 12 && hours < 17) {
    return 'Good afternoon';
  } else if (hours >= 17 && hours < 21) {
    return 'Good evening';
  } else {
    return 'Hello';
  }
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function getTodayDate(): string {
  return new Date().toISOString().split('T')[0];
}
