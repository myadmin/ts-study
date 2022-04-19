{
    const greeter = (person: string) => {
        return `Hello, ${person}`;
    }

    const user = "Jane User";

    console.log('name:', greeter(user));

    const isLoading: boolean = false;

    const decLiteral: number = 6;
    const hexLiteral: number = 0xf00d;
    const binaryLiteral: number = 0b1010;
    const octalLiteral: number = 0o744;

    const a: void = undefined;

    const sym1 = Symbol('key1');
    const sym2 = Symbol('key2');

    console.log('Symbol', Symbol('key1') === Symbol('key1'));

    const max = Number.MAX_SAFE_INTEGER;
    const max1 = max + 1;
    const max2 = max + 2;
    console.log('max', max1 === max2);

    const getValue = (value: unknown): string => {
        if (value instanceof Date) {
            return value.toISOString();
        }

        return String(value);
    }

    console.log('value:', getValue(123));
    console.log('value:', getValue(new Date()));

    const error = (message: string): never => {
        throw new Error(message);
    }

    const empty: never[] = [];
    console.log('empty:', empty);

    const list: Array<number> = [1, 2, 3];
    const list2: number[] = [1, 2, 3];

    // 元组
    let x: [string, number];
    x = ['hello', 12];
    // x = [1, 'sss'];

    interface Tuple extends Array<string | number> {
        0: string;
        1: number;
        length: 2;
    }

    const tuple: [string, number] = ['a', 1];
    tuple.push(2);
    tuple.push('123');
    console.log('tuple:', tuple);

    // 枚举类型
    enum Direction {
        Center = 1
    }

    let value: object;
    value = Direction;
    value = [1];
    value = [1, 'hello'];
    value = {};
    console.log('value =>', value);
}

{
    enum Direction {
        Up,
        Down,
        Left,
        Right
    }

    console.log('Direction =>', Direction.Up === 0);
    console.log('Direction =>', Direction.Down === 1);
    console.log('Direction =>', Direction.Left === 2);
    console.log('Direction =>', Direction.Right === 3);

    type c = 0;

    let b: c;

    // b = 1;
    b = Direction.Up;

    enum Direction2 {
        Up = 10,
        Down,
        Left,
        Right
    }

    console.log('Direction2 =>', Direction2.Up, Direction2.Down, Direction2.Left, Direction2.Right);

    enum Direction3 {
        Up = 'Up',
        Down = 'Down',
        Left = 'Left',
        Right = 'Right'
    }
    const a = Direction3.Up;
    console.log('a', a);
    console.log('Direction3 =>', Direction3['Up'], Direction3.Down, Direction3.Left, Direction3.Right);
}

enum Month {
    January,
    February,
    March,
    April,
    May,
    June,
    July,
    August,
    September,
    October,
    November,
    December,
}

namespace Month {
    export const isSummer = (month: Month) => {
        switch (month) {
            case Month.June:
            case Month.July:
            case Month.August:
                return true;
            default:
                return false
        }
    }
}

console.log('Month:', Month.isSummer(Month.May));


{
    interface Say {
        (words: string): string
    }

    interface User {
        name: string;
        age?: number;
        readonly isMale: boolean;
        say: Say;
    }

    let user: User = { name: 'zhang', isMale: true, say: (words: string) => { return words } };
    console.log('user =>', user.say('Hello'));
    user.name = 'acb';
    // user.isMale = false;

    interface Config {
        width?: number;
        [propName: string]: any;
    }

    const CalculateAreas = (config: Config): { area: number } => {
        let square = 100;
        if (config.width) {
            square = config.width * config.width;
        }
        return { area: square }
    }

    // let mySquare = CalculateAreas({ widdth: 5 } as Config);
    let options: any = { widdth: 5 };
    let mySquare = CalculateAreas(options);
    console.log('mySquare =>', mySquare);

    interface Phone {
        [name: string]: string;
    }

    interface Person {
        name: string;
        age?: number;
        readonly isMale: boolean;
        say: () => string;
        phone: Phone;
    }

    interface VIPPerson extends Person {
        broadcast: () => void;
    }
}

{
    // 抽象类
    abstract class Animal {
        abstract makeSound(): void;
        move(): void {
            console.log('roaming the earch...');
        }
    }

    // 不能直接实例化
    // const animal = new Animal

    // 只能子类继承基类，然后可以实例化子类
    class Cat extends Animal {
        makeSound(): void {
            console.log('miao miao');
        }
    }

    const cat = new Cat();

    cat.makeSound();
    cat.move();

    class Car {
        public run() {
            console.log('启动...');
        }

        private go() {
            console.log('跑起来...');
        }

        protected open() {
            console.log('开门...');
        }
    }

    class GTR extends Car {
        init() {
            this.open();
        }
    }

    const car = new Car();
    const gtr = new GTR();
    // car.open();
    // car.go();  // 私有属性，只能内部访问
    gtr.init();
    // gtr.open();
}

import * as React from 'react';

export default class Props {
    public children: Array<React.ReactElement<any>> | React.ReactElement<any> | never[] = [];
    public speed: number = 500;
    public height: number = 160;
    public animation: string = 'easeInOutQuad';
    public isAuto: boolean = true;
    public autoPlayInterval: number = 4500;
    // public afterChange: () => {};
    // public beforeChange: () => {};
    // public selesctedColor: string;
    public showDots: boolean = true;
}

{
    const add = (a: number, b?: number) => a + (b ? b : 0);
    const add2 = (a: number, b = 10) => a + b;
    const add3 = (a: number, ...rest: number[]) => rest.reduce(((a, b) => a + b), a);
}

// 重载
interface Direction5 {
    top: number;
    bottom?: number;
    left?: number;
    right?: number;
}
function assigned(all: number): Direction5;
function assigned(topAndBottom: number, leftAndRight: number): Direction5;
function assigned(top: number, right: number, bottom: number, left: number): Direction5;
function assigned(a: number, b?: number, c?: number, d?: number) {
    if (b === undefined && c === undefined && d === undefined) {
        b = c = d = a;
    } else if (c === undefined && d === undefined) {
        c = a;
        d = b;
    }

    return { top: a, right: b, bottom: c, left: d };
}

assigned(1);
assigned(1, 2);
// assigned(1, 2, 3);
assigned(1, 2, 3, 4);


{
    // 泛型
    const returnItem = <T>(para: T): T => {
        return para;
    }

    const swap = <T, U>(tuple: [T, U]): [U, T] => {
        return [tuple[1], tuple[0]];
    }
    console.log('swap =>', swap([7, 'seven']));

    const getArrayLength = <T>(arg: T[]): T[] => {
        console.log('arg =>', arg.length);
        return arg;
    }

    interface ReturnItemFn<T> {
        (para: T): T
    }

    interface GenericIdentityFn<T> {
        (arg: T): T;
    }

    const identity = <T>(arg: T): T => {
        return arg;
    }

    let myIdentity: GenericIdentityFn<number> = identity;
    console.log('myIdentity =>', myIdentity(333));


    const returnItem2: ReturnItemFn<number> = para => para;

    type Params = number | string;

    class Stack<T extends Params> {
        private arr: T[] = [];

        public push(item: T) {
            this.arr.push(item);
        }

        public pop() {
            this.arr.pop();
        }
    }

    const stack1 = new Stack<number>();
    // const stack2 = new Stack<boolean>();

    const getValue = <T extends object, U extends keyof T>(obj: T, key: U) => {
        return obj[key];
    };

    const a = {
        name: 'zhangsan',
        id: 1
    };

    getValue(a, 'id');

    interface Legnthwise {
        length: number;
    }

    const loggingIdentity = <T extends Legnthwise>(arg: T): T => {
        console.log('arg.length =>', arg.length);
        return arg;
    }

    loggingIdentity('123');
    loggingIdentity({ length: 10, value: 3 });

    interface FirstInterface {
        doSomething(): number;
    }

    interface SecondInterface {
        doSomethingElse(): string;
    }

    interface ChildInterface extends FirstInterface, SecondInterface {

    }

    // class Demo<T extends FirstInterface & SecondInterface> {
    //     private genericProperty: T;

    //     useT() {
    //         this.genericProperty.doSomething();
    //         this.genericProperty.doSomethingElse();
    //     }
    // }

    const factory = <T>(type: { new(): T }): T => {
        return new type();
    }

}

import * as type5 from './ts/type5';
import * as type6 from './ts/type6';
import * as type7 from './ts/type7';
