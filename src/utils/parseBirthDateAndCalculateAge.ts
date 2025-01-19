export function parseBirthDateAndCalculateAge(birthDateString: string): { birthYear: number; age: number } {
  try {
    if (birthDateString.length !== 8 || isNaN(Number(birthDateString))) {
      throw new Error('Invalid birth date format. Please provide in YYYYMMDD format.');
    }

    const birthYear = parseInt(birthDateString.slice(0, 4), 10);
    const birthMonth = parseInt(birthDateString.slice(4, 6), 10);
    const birthDay = parseInt(birthDateString.slice(6, 8), 10);

    if (birthMonth < 1 || birthMonth > 12 || birthDay < 1 || birthDay > 31) {
      throw new Error('Invalid birth date. Month or day is out of range.');
    }

    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    const currentDay = today.getDate();

    let age = currentYear - birthYear;

    if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay)) {
      age -= 1;
    }

    return { birthYear, age };
  } catch (error) {
    return { birthYear: 0, age: 0 };
  }
}
