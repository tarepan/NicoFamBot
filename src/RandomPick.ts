import { pipe } from "fp-ts/lib/function";

type index = number;

/**
 * Calculate index for picking random element
 * algorithm:
 *   1. generate random variable [0, 1)
 *   1. project [0, 1) to [0, length)
 *   2. floor then become Int [0, 1) => 0, [1, 2) => 1, ..., [l-1, l) => l-1
 *   3. this is random index
 * @param length - pick-target length (e.g. 3 to [1,2,3])
 * @returns - index of picked element
 */
export const pickRandomly = (length: number): index =>
  pipe(Math.random(), (v) => v * length, Math.floor);

if (require.main === module) {
  for (let i = 0; i < 1000; i++) {
    console.log(pickRandomly(10));
  }
}
