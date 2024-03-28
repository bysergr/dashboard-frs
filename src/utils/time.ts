export function calculateDaysPassed(from: string): number {
    const fromDate = new Date(from);
    const currentDate = new Date();

    const timeDifference = currentDate.getTime() - fromDate.getTime();
    const daysPassed = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    return daysPassed;
}