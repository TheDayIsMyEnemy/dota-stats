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

const tiers = {
    "rank_tier_0": "Uncalibrated",
    "rank_tier_1": "Herald",
    "rank_tier_2": "Guardian",
    "rank_tier_3": "Crusader",
    "rank_tier_4": "Archon",
    "rank_tier_5": "Legend",
    "rank_tier_6": "Ancient",
    "rank_tier_7": "Divine",
    "rank_tier_8": "Immortal",
  };
  
const rankTierToString = (rankTier) => {
    let rank = tiers[`rank_tier_${rankTier / 10}`];
    if (rankTier > 9 && rankTier !== 80) {
      rank += ` [${rankTier % 10}]`;
    }
    return rank;
  }

export { toMMSS, enumIsDefined, getOrdinal, getPercentage, rankTierToString };