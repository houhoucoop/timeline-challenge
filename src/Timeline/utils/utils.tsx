import { DEFAULT_STEP } from "./constants";

/**
 * Rounds a value to the nearest multiple of a given step size.
 * @param value - the value to round
 * @param step - the step size for rounding
 * @returns the rounded value
 */
export const roundToStep = (
  value: number,
  step: number = DEFAULT_STEP
): number => {
  if (isNaN(value) || step <= 0) return 0;
  return Math.round(value / step) * step;
};

/**
 * Clamps a value within a specified range.
 * @param value - the value to clamp
 * @param min - the minimum allowed value
 * @param max - the maximum allowed value
 * @returns the clamped value
 */
export const clampValue = (value: number, min: number, max: number): number => {
  if (isNaN(value)) return min;
  return Math.max(min, Math.min(value, max));
};
