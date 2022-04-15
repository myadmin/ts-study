/**
 * 重新构造做变换
 * type 类型别名：声明一个变量存储某个类型
 * infer 类型提取：将提取的类型存到一个变量中，相当于局部变量
 * 类型参数：用于接受具体的类型，在类型运算中也相当于局部变量
 */
// 数组类型的重新构造
type tuple = [1, 2, 3];

// 给元组类型添加新类型
type Push<Arr extends unknown[], Ele> = [...Arr, Ele];

export type PushResult = Push<tuple, 'string'>;

// 在前面添加新类型
type Unshift<Arr extends unknown[], Ele> = [Ele, ...Arr];

export type UnshiftRes = Unshift<tuple, 'undefined'>;

// 合并元组
type tuple1 = [1, 2];
type tuple2 = ['guang', 'dog'];

type Zip<One extends [unknown, unknown], Other extends [unknown, unknown]> =
    One extends [infer OneFirst, infer OneSecond]
    ? Other extends [infer OtherFirst, infer OtherSecond]
    ? [[OneFirst, OtherFirst], [OneSecond, OtherSecond]] : []
    : [];

export type ZipRes = Zip<tuple1, tuple2>;

type Zip2<One extends unknown[], Other extends unknown[]> =
    One extends [infer OneFirst, ...infer OneRest]
    ? Other extends [infer OtherFirst, ...infer OtherRest]
    ? [[OneFirst, OtherFirst], ...Zip2<OneRest, OtherRest>] : []
    : [];

export type ZipRes2 = Zip2<[1, 2, 3, 4, 5], ['tuple2', true, null, undefined, 123]>;


// 字符串类型的重新构造
// 字符串首字母转为大写
type CapitalizeStr<Str extends string> =
    Str extends `${infer First}${infer Rest}`
    ? `${Uppercase<First>}${Rest}` : Str;
export type CapitalizeResult = CapitalizeStr<'guang'>;

type CapitalizeStr2<Str extends string> =
    Str extends `${infer Rest}${infer Last}`
    ? `${Rest}${Lowercase<Last>}` : Str;
export type CapitalizeResult2 = CapitalizeStr2<'GUANG'>;

// 驼峰格式转换
type CamelCase<Str extends string> = Str extends `${infer Left}_${infer Right}${infer Rest}`
    ? `${Left}${Uppercase<Right>}${CamelCase<Rest>}`
    : Str;
export type CamelCaseRes = CamelCase<'dong_dong_dong'>;

// 删除字符串中的某个子串
type DropSubStr<Str extends string, SubStr extends string> =
    Str extends `${infer Prefix}${SubStr}${infer Suffix}`
    ? DropSubStr<`${Prefix}${Suffix}`, SubStr> : Str;
export type DropSubStrRes = DropSubStr<'my~~~~~', '~'>;


// 函数类型的重新构造
// 添加新的参数
type AppendArgument<Func extends Function, Arg> =
    Func extends (...args: infer Args) => infer ReturnType
    ? (...args: [...Args, Arg]) => ReturnType : never;
export type AppendArgumentResult = AppendArgument<(name: string) => boolean, number>;


// 索引类型的重新构造
type obj = {
    readonly name: string;
    age?: number;
    gender: boolean;
};

type Mapping<Obj extends object> = {
    [Key in keyof Obj]: Obj[Key]
};

export type MappingResult = Mapping<obj>;

type Mapping2<Obj extends object> = {
    [Key in keyof Obj]: [Obj[Key], Obj[Key], Obj[Key]]
};

export type Mapping2Result = Mapping2<{ a: 1, b: 2 }>;

// 重映射
type UppercaseKey<Obj extends object> = {
    [Key in keyof Obj as Uppercase<Key & string>]: Obj[Key]
};
export type UppercaseKeyRes = UppercaseKey<{ name: 'dong' }>;

// type Record<K extends string | number | symbol, T> = { [P in K]: T };
// type RecordRes = Record<string, string>;
// export const getName: RecordRes = { name: 'abc' };

type UppercaseKey2<Obj extends Record<string, any>> = {
    [Key in keyof Obj as Uppercase<Key & string>]: Obj[Key]
};
export type UppercaseKeyRes2 = UppercaseKey2<{ name: 'dong' }>;

// 只读
type ToReadonly<T> = {
    readonly [Key in keyof T]: T[Key]
};
export type ReadonlyResult = ToReadonly<{
    name: string;
    age: number
}>;

// 可选
type ToPartial<T> = {
    [Key in keyof T]?: T[Key]
};
export type PartialResult = ToPartial<{
    name: string;
    age: number
}>;

// 修改只读
type ToMutable<T> = {
    -readonly [Key in keyof T]: T[Key]
};
export type MutableResult = ToMutable<{
    readonly name: string;
    age: number
}>;

// 必填
type ToRequired<T> = {
    [Key in keyof T]-?: T[Key]
};
export type RequiredResult = ToRequired<{
    name?: string;
    age?: number
}>;

// 过滤
type FilterByValueType<Obj extends Record<string, any>, ValueType> = {
    [Key in keyof Obj as ValueType extends Obj[Key] ? Key : never]: Obj[Key]
};

interface Person {
    name: string;
    age: number;
    hobby: string[];
}

export type FilterResult = FilterByValueType<Person, string | number>;

