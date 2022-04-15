/**
 * 特殊特性要记清
 */
// IsAny 判断是否是any类型
type IsAny<T> = 'dog' extends ('zhang' & T) ? true : false;
export type IsAnyResult = IsAny<any>;
export type IsAnyResult2 = IsAny<''>;

// IsEqual 判断是否相等
type IsEqual<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? true : false;
export type IsEqualResult = IsEqual<'a', any>;

// IsUnion 判断联合类型
type IsUnion<A, B = A> = A extends A ? [B] extends [A] ? false : true : never;
export type IsUnionResult = IsUnion<'2' & ''>;

// IsNever 判断Never类型
type IsNever<T> = [T] extends [never] ? true : false;
export type IsNeverResult = IsNever<never>;

type IsAny2<T> = T extends number ? 1 : 2;
export type IsAny2Result = IsAny2<any>;

// IsTuple 判断元组类型
type IsTuple<T> =
    T extends readonly [...params: infer Eles]
        ? NotEqual<Eles['length'], number>
        : false;
type NotEqual<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? false : true;
export type IsTupleResult = IsTuple<[1, 2, 3]>;
export type IsTupleResult2 = IsTuple<number[]>;

// 联合类型转交叉类型
type UnionToIntersection<U> =
    (U extends U ? (x: U) => unknown : never) extends (x: infer R) => unknown
        ? R
        : never;
export type UnionToIntersectionResult = UnionToIntersection<{ zhang: 1 } | { san: 2 }>;

// 提取索引类型中可选索引
type GetOptional<Obj extends Record<string, any>> = {
    [Key in keyof Obj as {} extends Pick<Obj, Key> ? Key : never] : Obj[Key]
};
export type GetOptionalResult = GetOptional<{name: string; age?: number}>;

// 过滤所有非可选的索引
type isRequired<Key extends keyof Obj, Obj> = {} extends Pick<Obj, Key> ? never : Key;
type GetRequired<Obj extends Record<string, any>> = {
    [Key in keyof Obj as isRequired<Key, Obj>]: Obj[Key]
};
export type GetRequiredResult = GetRequired<{name: string; age?: number}>;

// 删除可索引签名
type RemoveIndexSignature<Obj extends Record<string, any>> = {
    [Key in keyof Obj as Key extends `${infer Str}` ? Str : never]: Obj[Key]
};
export type RemoveIndexSignatureResult = RemoveIndexSignature<{
    [key: string]: any;
    name: string;
    1: number;
    sleep(): void;
}>;

// 过滤class的public属性
class Dog {
    public name: string;
    protected age: number;
    private hobbies: string[];

    constructor() {
        this.name = 'hei';
        this.age = 2;
        this.hobbies = ['eat', 'sleep'];
    }
}
type ClassPublicProps<Obj extends Record<string, any>> = {
    [Key in keyof Obj]: Obj[Key]
};
export type ClassPublicPropsResult = ClassPublicProps<Dog>;
