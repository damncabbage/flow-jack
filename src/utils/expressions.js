// @flow

// if-lazy
export const ifl =
  <A>(pred: boolean, fThen: () => A, fElse: () => A): A => {
    if (pred) {
      return fThen();
    } else {
      return fElse();
    }
  };

// if-eager
export const ife =
  <A>(pred: boolean, vThen: A, vElse: A): A => {
    if (pred) {
      return vThen;
    } else {
      return vElse;
    }
  };
