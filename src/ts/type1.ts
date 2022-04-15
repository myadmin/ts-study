// 模式匹配做提取
export type GetValueType<P> = P extends Promise<infer Value> ? Value : never;
export type GetValueResult = GetValueType<Promise<'promise'>>;

// First
type arr = [1, 2, 3];
type GetFirst<Arr extends unknown[]> = Arr extends [infer First, ...unknown[]] ? First : never;
export type getFirstVal = GetFirst<arr>;

// Last
type GetLast<Arr extends unknown[]> = Arr extends [...unknown[], infer Last] ? Last : never;
export type getLastVal = GetLast<arr>;

// PopArr
type PopArr<Arr extends unknown[]> = Arr extends [] ? [] : Arr extends [...infer Rest, unknown] ? Rest : never;
export type popArr = PopArr<arr>;

// ShiftArr
type ShiftArr<Arr extends unknown[]> = Arr extends [] ? [] : Arr extends [unknown, ...infer Rest] ? Rest : never;
export type shiftArr = ShiftArr<arr>;

// StartWith
type StartWith<Str extends string, Prefix extends string> = Str extends `${Prefix}${string}` ? true : false;
export type startWith = StartWith<'name', 'n'>;

// Replace
type ReplaceStr<Str extends string, From extends string, To extends string> =
    Str extends `${infer Prefix}${From}${infer Suffix}` ? `${Prefix}${To}${Suffix}` : Str;
export type ReplaceResult = ReplaceStr<'My best friend is ?', '?', 'Dongdong'>;

// Trim
type TrimStrRight<Str extends string> = Str extends `${infer Rest}${' ' | '\n' | '\t'}` ? TrimStrRight<Rest> : Str;
type TrimStrLeft<Str extends string> = Str extends `${' ' | '\n' | '\t'}${infer Rest}` ? TrimStrLeft<Rest> : Str;
type TrimStr<Str extends string> = TrimStrRight<TrimStrLeft<Str>>;
export type TrimStrResult = TrimStr<'  dog    '>;

// GetParameters 提取参数的类型
type GetParameters<Func extends Function> = Func extends (...args: infer Args) => unknown ? Args : never;
export type ParametersResult = GetParameters<(name: string, age: number) => string>;

// GetReturnType 提取返回值类型
type GetReturnType<Func extends Function> = Func extends (...args: any[]) => infer ReturnType ? ReturnType : never;
export type ReturnTypeResult = GetReturnType<() => number>;

// GetThisParameterType 提取this的指向类型
class Dong {
    name: string;
    constructor() {
        this.name = 'dong';
    }
    hello(this: Dong) {
        return `hello, I'm ${this.name}`;
    }
}

const dong = new Dong();
dong.hello();

type GetThisParameterType<T> = T extends (this: infer ThisType, ...args: any[]) => any ? ThisType : unknown;
export type GetThisParameterTypeRes = GetThisParameterType<typeof dong.hello>;

// GetInstanceType 提取构造器的参数和返回值的类型
interface Person {
    name: string;
}

interface PersonConstuctor {
    new(name: string): Person;
}

// 提取构造器返回值类型
type GetInstanceType<ConstructorType extends new (...args: any) => any> =
    ConstructorType extends new (...args: any) => infer InstanceType ? InstanceType : any;
export type GetInstanceTypeRes = GetInstanceType<PersonConstuctor>;

// 提取构造器的参数类型
type GetConstructorParameters<ConstructorType extends new (...args: any) => any> =
    ConstructorType extends new (...args: infer ParametersType) => any ? ParametersType : never;
export type GetConstructorParametersRes = GetConstructorParameters<PersonConstuctor>;

type GetObjValue<T extends { [key: string]: string }> =
    T extends { [key: string]: infer K } ? K : never;
export type GetObjValueRes = GetObjValue<{ a: '123', b: 'ccc', c: 'dddd' }>;

// Obj[keyof Obj]


// GetObjectParamerType 获取对象的值类型
type GetObjectParamerType<Obj extends Object> = Obj extends { [key: string]: infer T }
    ? T extends string
    ? string
    : T extends number
    ? number
    : T extends boolean
    ? boolean
    : never
    : never;
export type GetObjectParamerTypeRes = GetObjectParamerType<{ name: 'zhang' }>;

type Record<K extends string | number | symbol, T> = {
    [P in K]: T
};

export type RecordResult = Record<'a' | 'b', 1>;

type MergeValue<One, Other> = One extends Other ? One : Other extends unknown[] ? [One, ...Other] : [One, Other];

type MergeParams<
    OneParam extends Record<string, any>,
    OtherParam extends Record<string, any>
> = {
    readonly [Key in keyof OneParam | keyof OtherParam]:
        Key extends keyof OneParam
            ? Key extends keyof OtherParam
                ? MergeValue<OneParam[Key], OtherParam[Key]>
                : OneParam[Key]
            : Key extends keyof OtherParam
                ? OtherParam[Key]
                : never;
}

type ParseParam<Param extends string> = Param extends `${infer Key}=${infer Value}`
    ? { [K in Key]: Value }
    : Record<string, any>;

type ParseQueryString<Str extends string> = Str extends `${infer Param}&${infer Rest}`
    ? MergeParams<ParseParam<Param>, ParseQueryString<Rest>>
    : ParseParam<Str>;

export type MergeParamsResult = MergeParams<{a: 1}, {a: 2, b: 3}>;
export type ParseQueryStringRes = ParseQueryString<'a=1&a=2&b=3&c=4'>;

function parseQueryString<Str extends string>(queryStr: Str): ParseQueryString<Str> {
    if (!queryStr || !queryStr.length) {
        return {} as any;
    }
    const queryObj = {} as any;
    const items = queryStr.split('&');
    items.forEach(item => {
        const [key, value] = item.split('=');
        if (queryObj[key]) {
            if (Array.isArray(queryObj[key])) {
                queryObj[key].push(value);
            } else {
                queryObj[key] = [queryObj[key], value];
            }
        } else {
            queryObj[key] = value;
        }
    });
    return queryObj as any;
}

const res = parseQueryString('a=1&b=2&c=3&d=[1,2,3,4]');
console.log(res);

