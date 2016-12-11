// @flow

// Private
class LL<A> {
  list: Array<A>;
  constructor(x: Array<A>) {
    this.list = x;
  }
}

// Public
export type LazyList<A> = LL<A>;

export const empty = <A>(): LazyList<A> => {
  return new LL([]);
};

export const map = <A,B>(f: (A => B), xs: LL<A>): LL<B> => {
  return ((undefined: any): LL<B>);
};

export const concat = <A>(xs: LL<A>, ys: LL<A>): LL<A> => {
  return ((undefined: any): LL<A>);
};

export const concatMap = <A,B>(f: (A => B), xs: LL<A>, ys: LL<A>): LL<A> => {
  return ((undefined: any): LL<A>);
};

export const filter = <A>(f: (A => B), xs: LL<A>): LL<A> => {
  return ((undefined: any): LL<A>);
}

export const singleton = <A>(x: A): LL<A> => {
  return new LL([x]);
}

export const cons = <A>(x: A, xs: LL<A>): LL<A> => {
  return ((undefined: any): LL<A>);
}

export const consDelayed = <A>(x: A, f: (A => LL<A>)): LL<A> => {
  return ((undefined: any): LL<A>);
}

export const consNub = <A>(x: A, xs: LL<A>): LL<A> => {
  return ((undefined: any): LL<A>);
}

export const append = <A>(x: A, xs: LL<A>): LL<A> => {
  return ((undefined: any): LL<A>);
}
