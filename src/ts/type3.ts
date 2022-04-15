/**
 * 递归复用做循环
 */
// Promise 的递归复用
// 实现一个提取不确定层数的 Promise 中的 value 类型的高级类型
type ttt = Promise<Promise<Record<symbol, unknown>>>;

type DeepPromiseValueType<P extends Promise<unknown>> =
    P extends Promise<infer ValueType>
        ? ValueType extends Promise<unknown>
            ? DeepPromiseValueType<ValueType>
            : ValueType
        : never;
export type DeepPromiseResult = DeepPromiseValueType<ttt>;

type DeepPromiseValueType2<T> =
    T extends Promise<infer ValueType>
        ? DeepPromiseValueType2<ValueType>
        : T;
export type DeepPromiseResult2 = DeepPromiseValueType2<ttt>;


// 数组类型的递归
// 反转数组
type arr = [1, 2, 3, 4, 5];
type arr2 = ['one', 'two', 3, 4, 5];
type ReverseArr<Arr extends unknown[]> =
    Arr extends [infer First, ...infer Rest]
        ? [...ReverseArr<Rest>, First]
        : Arr;
export type ReverseArrResult = ReverseArr<arr | arr2>;

// 查找数组中的元素
type Includes<Arr extends unknown[], FindItem> =
    Arr extends [infer First, ...infer Rest]
        ? IsEqual<First, FindItem> extends true
            ? true
            : Includes<Rest, FindItem>
        : false;
type IsEqual<A, B> = (A extends B ? true : false) & (B extends A ? true : false);
export type IncludesResult = Includes<arr, 6>;

// 移除数组中指定的元素
type RemoveItem<Arr extends unknown[], Item, Result extends unknown[] = []> =
    Arr extends [infer First, ...infer Rest]
        ? IsEqual<First, Item> extends true
            ? RemoveItem<Rest, Item, Result>
            : RemoveItem<Rest, Item, [...Result, First]>
        : Result;
export type RemoveItemResult = RemoveItem<arr2, 'two'>;
export type RemoveItemResult2 = RemoveItem<arr2, 'one'>;

type RemoveItem2<Arr extends unknown[], Item> =
    Arr extends [infer First, ...infer Rest]
        ? IsEqual<First, Item> extends true
            ? RemoveItem2<Rest, Item>
            : [First, ...RemoveItem2<Rest, Item>]
        : Arr;
export type RemoveItemResult3 = RemoveItem2<arr2, 'one'>;

// 构造数组
type BuildArray<Length extends number, Ele = unknown, Arr extends unknown[] = []> =
    Arr['length'] extends Length ? Arr : BuildArray<Length, Ele, [...Arr, Ele]>;
export type BuildArrayResult = BuildArray<5, '123', ['aaa']>;


// 字符串类型的递归
// 字符串替换
type ReplaceAll<Str extends string, From extends string, To extends string> =
    Str extends `${infer Left}${From}${infer Right}`
        ? `${Left}${To}${ReplaceAll<Right, From, To>}`
        : Str;
export type ReplaceAllResult = ReplaceAll<'guanx guang guang', 'guang', 'dog'>;

// 字符串转成联合类型
type StringToUnion<Str extends string> =
    Str extends `${infer First}${infer Rest}`
        ? First | StringToUnion<Rest>
        : never;
export type StringToUnionResult = StringToUnion<'hello'>;

// 反转字符串
type ReverseStr<Str extends string, Result extends string = ''> =
    Str extends `${infer First}${infer Rest}`
        ? ReverseStr<Rest, `${First}${Result}`>
        : Result;
export type ReverseStrResult = ReverseStr<'home'>;


// 对象类型的递归
type ToReadonly<T> = {
    readonly [Key in keyof T]: T[Key]
};
export type ReadonlyResult = ToReadonly<{name: string; age: number}>;

type obj = {
    a: {
        b: {
            c: {
                f: () => 'dong',
                d: {
                    e: {
                        guang: string
                    }
                }
            }
        }
    }
}
type DeepReadonly<Obj extends Record<string, any>> = {
    readonly [Key in keyof Obj]:
        Obj[Key] extends object
            ? Obj[Key] extends Function
                ? Obj[Key]
                : DeepReadonly<Obj[Key]>
            : Obj[Key]
};
export type DeepReadonlyResult = DeepReadonly<obj>;
