const toMMSS = (seconds: number): string => {
    let minutes = Math.floor(seconds / 60);
    seconds -= minutes * 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

const enumIsDefined = (enumType: object, value: string): boolean => {
    return Object.keys(enumType).filter(k => k.toLocaleLowerCase() === value.toLocaleLowerCase()).length > 0;
}

const getOrdinal = (rank: number): string => {
    if (rank % 10 == 1) {
        return rank + "st";
    }
    else if (rank % 10 == 2) {
        return rank + "nd";
    }
    else if (rank % 10 == 3) {
        return rank + "rd";
    }
    return rank + "th";
}

export { toMMSS, enumIsDefined, getOrdinal };