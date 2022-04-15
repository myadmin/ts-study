/**
 * 数组长度做计数
 */
// type num1 = [unknown]['length'];

// 数组长度实现加减乘除

// 构造数组
type BuildArray<Length extends number, Ele = unknown, Arr extends unknown[] = []> =
    Arr['length'] extends Length ? Arr : BuildArray<Length, Ele, [...Arr, Ele]>;
export type BuildArrayResult = BuildArray<10>;
// 加法
type Add<Num1 extends number, Num2 extends number> = [...BuildArray<Num1>, ...BuildArray<Num2>]['length'];
export type AddResult = Add<999, 999>;

// 减法
type Subtract<Num1 extends number, Num2 extends number> =
    BuildArray<Num1> extends [...arr1: BuildArray<Num2>, ...arr2: infer Rest]
        ? Rest['length']
        : never;
export type SubtractResult = Subtract<96, 34>;

// 乘法
type Mutiply<Num1 extends number, Num2 extends number, ResultArr extends unknown[] = []> =
    Num2 extends 0 ? ResultArr['length']
    : Mutiply<Num1, Subtract<Num2, 1>, [...BuildArray<Num1>, ...ResultArr]>;
export type MutiplyResult = Mutiply<101, 99>;

// 除法
type Divide<Num1 extends number, Num2 extends number, CountArr extends unknown[] = []> =
    Num1 extends 0 ? CountArr['length']
    : Divide<Subtract<Num1, Num2>, Num2, [unknown, ...CountArr]>;
export type DivideResult = Divide<50, 2>;

// 数组长度实现计数
type StrLen<Str extends string, CountArr extends unknown[] = []> =
    Str extends `${string}${infer Rest}`
        ? StrLen<Rest, [...CountArr, unknown]>
        : CountArr['length'];
export type StrLenResult = StrLen<'hello, my name is xxx'>;

// 比值
type GreaterThan<Num1 extends number, Num2 extends number, CountArr extends unknown[] = []> =
    Num1 extends Num2
        ? false
        : CountArr['length'] extends Num2
            ? true
            : CountArr['length'] extends Num1
                ? false
                : GreaterThan<Num1, Num2, [...CountArr, unknown]>;
export type GreaterThanResult = GreaterThan<31, 10>;

// 斐波那契数列
type FibonacciLoop<
    PrevArr extends unknown[],
    CurrentArr extends unknown[],
    IndexArr extends unknown[] = [],
    Num extends number = 1
> = IndexArr['length'] extends Num
    ? CurrentArr['length']
    : FibonacciLoop<CurrentArr, [...PrevArr, ...CurrentArr], [...IndexArr, unknown], Num>;
type Fibonacci<Num extends number> = FibonacciLoop<[1], [], [], Num>;
export type FibonacciResult = Fibonacci<20>;
