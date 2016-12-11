// @flow

declare var describe: Function;
declare var it: Function;
import assert from 'assert';

import type { SplittableSeed } from '../src/seed';
import * as seed from '../src/seed';
import bigInt from 'big-integer';

describe('Seed', () => {
  it('nextBigInt', () => {
    const items = 10000
    const min = -10000
    const max = 10000

    const s = seed.ofInt32(100)
    const [lo,hi] = [min,max].map(x => bigInt(x))

    const [s3,res] = Array(items).fill(null).reduce((acc,n) => {
      const [r,s2] = seed.nextBigInt(lo,hi,acc[0])
      return [s2, acc[1].concat(r)];
    }, [s,[]])

    res.forEach(x => assert(x >= min && x <= max, x))
  });
});
