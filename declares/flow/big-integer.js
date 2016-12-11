// @flow

declare module 'big-integer' {
  declare type BigIntish =
    string | number | BigInteger;

  declare class BigInteger {
    constructor(n: BigIntish): void;

    isInstance(x: any): boolean;

    add(BigIntish): BigInteger;
    abs(): BigInteger;
    and(BigIntish): BigInteger;
    compare(BigIntish): -1 | 0 | 1;
    compareAbs(BigIntish): -1 | 0 | 1;
    compareTo(BigIntish): -1 | 0 | 1;
    divide(BigIntish): BigInteger;
    divmod(BigIntish): { quotient: BigInteger, remainder: BigInteger };
    eq(BigIntish): boolean;
    equals(BigIntish): boolean;
    geq(BigIntish): boolean;
    greater(BigIntish): boolean;
    greaterOrEquals(BigIntish): boolean;
    gt(BigIntish): boolean;
    isDivisibleBy(BigIntish): boolean;
    isEven(): boolean;
    isNegative(): boolean;
    isOdd(): boolean;
    isPositive(): boolean;
    isPrime(): boolean;
    isProbablePrime(iterations: ?number): boolean;
    isUnit(): boolean;
    isZero(): boolean;
    leq(BigIntish): boolean;
    lesser(BigIntish): boolean;
    lesserOrEquals(BigIntish): boolean;
    lt(BigIntish): boolean;
    minus(BigIntish): BigInteger;
    mod(BigIntish): BigInteger;
    modInv(BigIntish): BigInteger;
    modPow(BigIntish, BigIntish): BigInteger;
    multiply(BigIntish): BigInteger;
    neq(BigIntish): boolean;
    next(): BigInteger;
    not(): BigInteger;
    notEquals(BigIntish): boolean;
    or(BigIntish): BigInteger;
    over(BigIntish): BigInteger;
    plus(BigIntish): BigInteger;
    pow(BigIntish): BigInteger;
    prev(BigIntish): BigInteger;
    remainder(BigIntish): BigInteger;
    shiftLeft(BigIntish): BigInteger;
    shiftRight(BigIntish): BigInteger;
    square(): BigInteger;
    subtract(BigIntish): BigInteger;
    times(BigIntish): BigInteger;
    toJSNumber(): BigInteger;
    xor(BigIntish): BigInteger;

    toString(radix?: BigIntish): string;
    valueOf(): number;

    static gcd(BigIntish, BigIntish): BigInteger;
    static lcm(BigIntish, BigIntish): BigInteger;
    static max(BigIntish, BigIntish): BigInteger;
    static min(BigIntish, BigIntish): BigInteger;
    static randBetween(BigIntish, BigIntish): BigInteger;

    static zero: BigInteger;
    static one: BigInteger;
    static minusOne: BigInteger;
    // ... plus the direct [...] number accessor
    // which I'm not going to implement here,
    // because Oh Come On.
  }

  declare module.exports: (BigIntish) => BigInteger;
  //declare var exports: typeof BigInteger;
}

// Filename aliases
declare module 'big-integer/BigInteger.js' {
  declare module.exports: $Exports<'big-integer/BigInteger'>;
}
