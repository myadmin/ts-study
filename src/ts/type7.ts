type ParseParam<Param extends string> =
    Param extends `${infer Key}=${infer Value}`
        ? {
            [K in Key]: Value
        } : Record<string, any>;

type ParseParamResult = ParseParam<'a=1'>;

type MergeParams<
    OneParam extends Record<string, any>,
    OtherParam extends Record<string, any>
> = {
    [Key in keyof OneParam | keyof OtherParam]:
        Key extends keyof OneParam
            ? Key extends keyof OtherParam
                ? MergeValues<OneParam[Key], OtherParam[Key]>
                : OneParam[Key]
            : Key extends keyof OtherParam
                ? OtherParam[Key]
                : never;
}

type MergeValues<One, Other> =
    One extends Other
        ? One
        : Other extends unknown[]
            ? [One, ...Other]
            : [One, Other];

type ParseQueryString<Str extends string> =
    Str extends `${infer Param}&${infer Rest}`
        ? MergeParams<ParseParam<Param>, ParseQueryString<Rest>>
        : ParseParam<Str>;

// type MergeParamsResult = MergeParams<{a: 1}, {b: 2}>;

// type ParseQueryStringResult = ParseQueryString<'a=1&b=2'>;

export const parseQueryString = <Str extends string>(queryStr: Str): ParseQueryString<Str> => {
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
};

const res = parseQueryString('a=1&b=2&c=3');
console.log(res);
