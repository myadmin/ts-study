export const getPropValue = <T extends object, Key extends keyof T>(obj: T, key: Key): T[Key] => {
    return obj[key];
}

const age = getPropValue({ name: 'zhang', age: 18 }, 'age');
console.log('age', age);

type ParseParam<Param extends string> = Param extends `${infer Key}=${infer Value}` ? { [K in Key]: Value } : {};

type MergeValues<One, Other> = One extends Other ? One : Other extends unknown[] ? [One, ...Other] : [One, Other];

type MergeParams<
    OneParam extends Record<string, any>,
    OtherParam extends Record<string, any>,
    > = {
        [Key in keyof OneParam | keyof OtherParam]:
        Key extends keyof OneParam
        ? Key extends keyof OtherParam
        ? MergeValues<OneParam[Key], OtherParam[Key]>
        : OneParam[Key]
        : Key extends keyof OtherParam
        ? OtherParam[Key]
        : never
    }

export type ParseQueryString<Str extends string> =
    Str extends `${infer Param}&${infer Rest}`
    ? MergeParams<ParseParam<Param>, ParseQueryString<Rest>>
    : ParseParam<Str>;

// export type res = ParseQueryString<'a=1&b=2&c=3'>;

interface IPerson {
    readonly name: string;
    age?: number;
    // [prop: string]: string | number;
}

export type tuple = [string, number?];

export class Person implements IPerson {
    name: string = 'name';
    age: number = 22;
}

// 函数
interface SyaHello {
    (name: string): string;
}

export const func: SyaHello = (name: string) => {
    return 'hello,' + name;
}

// 构造器
interface PersonConstroctor {
    new(name: string, age: number): IPerson;
}

export function createPerson(ctor: PersonConstroctor): IPerson {
    return new ctor('zhang', 20);
}

// 条件类型 extends ? :
export type res = 1 extends 2 ? true : false;

type isTwo<T> = T extends 2 ? true : false;
export type rest = isTwo<1>;
export type rest2 = isTwo<2>;

// 推导 infer
// eslint-disable-next-line
type First<Tuple extends unknown[]> = Tuple extends [infer T, ...infer V] ? T : never;
export type first = First<[1, 2, 3]>;

// 交叉类型
type ObjType = { a: number } & { c: boolean };
export type rest3 = { a: number } & { c: boolean } extends ObjType ? true : false;

// 映射类型
export type MapType<T> = {
    [Key in keyof T]?: T[Key]
}
// keyof T 是查询索引类型中所有的索引，叫做索引查询。
// T[Key] 是取索引类型某个索引的值，叫做索引访问。

// 重映射
type MapType2<T> = {
    [Key in keyof T as `${Key & string}${Key & string}${Key & string}`]: [T[Key], T[Key], T[Key]]
}
type res2 = MapType2<{ a: 1, b: 2 }>
