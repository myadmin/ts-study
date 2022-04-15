/**
 * 联合分散可简化
 */

type Union = 'a' | 'b' | 'c';
type UppercaseA<Item extends string> =
    Item extends 'a' ? Uppercase<Item> : Item;
export type UppercaseResult = UppercaseA<Union>;
export type str = `${Union}~~~`;

// 字符串首字母大写(小驼峰)
type Camelcase<Str extends string> =
    Str extends `${infer Left}_${infer Right}${infer Rest}`
    ? `${Left}${Uppercase<Right>}${Camelcase<Rest>}`
    : Str;
export type CamelcaseResult = Camelcase<'aa_bb_cc_dd_EE'>;

// 字符串数组首字母大写
type CamelcaseArr<Arr extends unknown[], Result extends unknown[] = []>
    = Arr extends [infer Item, ...infer RestArr]
    ? [...Result, Camelcase<Item & string>, ...CamelcaseArr<RestArr>]
    : Result;
export type CamelcaseArrResult = CamelcaseArr<['aa_aa_aa', 'bb_bb_bb']>;

type CamelcaseUnion<Item extends string> =
    Item extends `${infer Left}_${infer Right}${infer Rest}`
        ? `${Left}${Uppercase<Right>}${CamelcaseUnion<Rest>}`
        : Item;
export type CamelcaseUnionResult = CamelcaseUnion<'aa_aa_aa' | 'bb_bb_bb' | 'cc_cc_cc'>;

type BEM<
    Block extends string,
    Element extends string[],
    Modifiers extends string[]
> = `${Block}__${Element[number]}--${Modifiers[number]}`;
export type BEMResult = BEM<'ant', ['icon', 'tips'], ['warning', 'success']>;

// 全组合高级类型
type Combination<A extends string, B extends string> =
    | A
    | B
    | `${A}${B}`
    | `${B}${A}`;
type AllCombinations<A extends string, B extends string = A> =
    A extends A
        ? Combination<A, AllCombinations<Exclude<B, A>>>
        : never;
export type AllCombinationsResult = AllCombinations<'AB' | 'B' | 'CC'>;
