// @flow

//
// This file, types aside, is about a close of a port I could manage
// of dotnet-jack's Jack.Seed at 5b32001cf2d2 (the GHC's
// System.Random implementation).
//
// -----------------------------------------------------------------
//
// This is a port of GHC's System.Random implementation.
//
// This implementation uses the Portable Combined Generator of L'Ecuyer
// for 32-bit computers [1], transliterated by Lennart Augustsson.
//
// 1. Pierre L'Ecuyer
//    Efficient and portable combined random number generators
//    Comm ACM, 31(6), Jun 1988, pp742-749.
//

import { Data2 } from './utils/data';
import { ife } from './utils/expressions';
import { CrashError } from './error';
import BigInteger from 'big-integer';
import bigInt from 'big-integer';

class Seed extends Data2<number,number> {}
export type SplittableSeed = Seed;

const crashUnless = (cond: boolean, expected: string, but: string): void => {
  if (!cond) throw new CrashError("Expected: "+expected+", but: "+but);
};


// c() for "chop"
const c = (n: number): number => (n | 0)

const int32MinValue = -2147483648;
const int32MaxValue = 2147483647;

/// Create a new 'Seed' from a 32-bit integer.
export const ofInt32 = (s0Raw: number): Seed => {
  // Clamp this to a 32-bit integer by bit-OR'ing.
  const s0 = c(s0Raw);

  // We want a non-negative number, but we can't just take the abs
  // of s0 as -int32MinValue == int32MinValue.

  // TODO: remove crashUnless

  // The integer variables s1 and s2 must be initialized to values
  // in the range [1, 2147483562] and [1, 2147483398] respectively. [1]
  const s = s0 & int32MaxValue;
  crashUnless(s >= 0, "s >= 0", "s == " + s.toString())

  const q = c(s / 2147483562);
  crashUnless(q >= 0, "q >= 0", "q == " + q.toString())

  const s1 = c(s % 2147483562);
  const s2 = c(q % 2147483398);

  return new Seed(c(s1 + 1), c(s2 + 1));
};


/// Create a new 'Seed' using 'System.Random' to seed the generator.
export const random = (): Seed => {
  const randInt32 = c(
    (Math.random() * (int32MaxValue + (-1 * int32MinValue))) - (-1 * int32MinValue)
  );
  return ofInt32(randInt32);
};

export const range =
  (): [number,number] => [1, 2147483562];

export const next = (seed: Seed): [number, Seed] => {
  const [s1, s2] = [c(seed.value1), seed.value2];

  // TODO remove crashUnless
  crashUnless(s1 >= 0, "s1 >= 0", "s1 == " + s1.toString())
  const k    = c(s1 / 53668);
  const s1v2 = c(c(40014 * c(c(s1 - k) * 53668)) - c(k * 12211))
  const s1v3 = ife(s1v2 < 0, c(s1v2 + 2147483563), s1v2)

  crashUnless(s2 >= 0, "s2 >= 0", "s2 == " + s2.toString())
  const kv2  = c(s2 / 52774)
  const s2v2 = c(c(40692 * c(c(s2 - kv2) * 52774)) - c(kv2 * 3791))
  const s2v3 = ife(s2v2 < 0, c(s2v2 + 2147483399), s2v2)

  const z   = c(s1v3 - s2v3);
  const zv2 = ife(z < 1, c(z + 2147483562), z);

  return [zv2, new Seed(s1v3, s2v3)]
}


// Generate a random bigint in the specified range.
export const nextBigInt =
  (lo: BigInteger, hi: BigInteger, seed: Seed): [BigInteger,Seed] => {
    if (lo.greater(hi)) { // lo > hi
      console.log('swapping')
      return nextBigInt(hi, lo, seed);
    }

    //
    // Probabilities of the most likely and least likely result will differ
    // at most by a factor of (1 +- 1/q). Assuming Seed is uniform, of
    // course.
    //
    // On average, log q / log b more random values will be generated than
    // the minimum.
    //

    const [genLo, genHi] = range()
    const b = bigInt(genHi).minus(genLo).plus(1)

    const q = bigInt(1000)
    const k = hi.minus(lo).plus(1)
    const magtgt = k.multiply(q)

    // Generate random values until we exceed the target magnitude.
    // [This is a translation of a TCO'd loop function. - Rob]
    const loop = (mag, v0, seed0): [BigInteger,BigInteger] => {
      let currMag = mag;
      let currV = v0;
      let currSeed = seed0;
      while (currMag.lt(magtgt)) {
        const [x, seed1] = next(currSeed);
        let v1 = currV.multiply(b).plus(bigInt(x).minus(genLo));
        // Set params for next loop:
        currMag = mag.multiply(b);
        currV = v1;
        currSeed = seed1;
      }
      return [currV, currSeed];
    }

    const [v, seedN] = loop(bigInt(1), bigInt(0), seed);

    // TODO remove crashUnless
    crashUnless(v.geq(0), "v >= 0", "v == "+v.toString());
    crashUnless(k.geq(0), "k >= 0", "k == "+k.toString());
    return [lo.plus(v.mod(k)), seedN];
  };

export const split = (seed: Seed): [Seed,Seed] => {
  const [s1, s2] = [seed.value1, seed.value2];

  const rhSeed = next(seed)[1];
  const [t1, t2] = [rhSeed.value1, rhSeed.value2];

  // no statistical foundation for this!
  // [ ^-- My favourite comment in all of this. - Rob]
  const newS1 = ife(s1 == 2147483562, 1, s1 + 1);
  const newS2 = ife(s2 == 1, 2147483398, s2 - 1);
  const left  = new Seed(newS1, t2);
  const right = new Seed(t1, newS2);

  return [left, right];
};

console.log(nextBigInt( bigInt(111), bigInt(222), random() ));
