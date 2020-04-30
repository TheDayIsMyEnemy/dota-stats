const toMMSS = (seconds: number): string => {
    let minutes = Math.floor(seconds / 60);
    seconds -= minutes * 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

const enumIsDefined = (enumType: object, value: string): boolean => {
    return Object.keys(enumType).filter(k => k.toLocaleLowerCase() === value.toLocaleLowerCase()).length > 0;
}

const getOrdinal = (number: number): string => {
    let remainder = number % 10;
    switch (remainder) {
        case 1:
            return number + "st";
        case 2:
            return number + "nd";
        case 3:
            return number + "rd";
        default:
            return number + "th";
    }
}

const getPercentage = (total, number) => {
    return (number / total * 100).toFixed(1);
}

export { toMMSS, enumIsDefined, getOrdinal, getPercentage };