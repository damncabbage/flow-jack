// @flow

// Create new named types by extending these, eg.
//
//   export class Seed extends Data2<number,number> {}
//
//   const seed = new Seed(123,456);
//   console.log(seed.value1, seed.value2);
//
// (This approach is cribbed from G. Canti's flow-static-types library/experiment.)

export class Data1<A> {
  +value1: A;
  constructor(value1: A) {
    (this: any).value1 = value1;
  }
}

export class Data2<A,B> {
  +value1: A;
  +value2: B;
  constructor(value1: A, value2: B) {
    (this: any).value1 = value1;
    (this: any).value2 = value2;
  }
}

export class Data3<A,B,C> {
  +value1: A;
  +value2: B;
  +value3: C;
  constructor(value1: A, value2: B, value3: C) {
    (this: any).value1 = value1;
    (this: any).value2 = value2;
    (this: any).value3 = value3;
  }
}

export class Data4<A,B,C,D> {
  +value1: A;
  +value2: B;
  +value3: C;
  +value4: D;
  constructor(value1: A, value2: B, value3: C, value4: D) {
    (this: any).value1 = value1;
    (this: any).value2 = value2;
    (this: any).value3 = value3;
    (this: any).value4 = value4;
  }
}

export class Data5<A,B,C,D,E> {
  +value1: A;
  +value2: B;
  +value3: C;
  +value4: D;
  +value5: E;
  constructor(value1: A, value2: B, value3: C, value4: D, value5: E) {
    (this: any).value1 = value1;
    (this: any).value2 = value2;
    (this: any).value3 = value3;
    (this: any).value4 = value4;
    (this: any).value5 = value5;
  }
}
