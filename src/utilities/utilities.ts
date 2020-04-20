const toMMSS = (seconds: number): string => {
    let minutes = Math.floor(seconds / 60);
    seconds -= minutes * 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

const enumIsDefined = (enumType: object, value: string): boolean => {
    return Object.keys(enumType).filter(k => k.toLocaleLowerCase() === value.toLocaleLowerCase()).length > 0;
}

export { toMMSS, enumIsDefined };