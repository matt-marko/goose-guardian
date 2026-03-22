/**
 * Random integer in [min, max]
 */
export function randomInt(min: number, max: number): number {
    return Math.floor((Math.random() * (max - min + 1))) + min;
}

/**
 * Random floating point number in [min, max]
 */
export function randomFloat(min: number, max: number): number {
    return (Math.random() * (max - min)) + min;
}