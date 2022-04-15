"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
{
    var greeter = function (person) {
        return "Hello, ".concat(person);
    };
    var user = "Jane User";
    console.log('name:', greeter(user));
    var isLoading = false;
    var decLiteral = 6;
    var hexLiteral = 0xf00d;
    var binaryLiteral = 10;
    var octalLiteral = 484;
    var a = undefined;
    var sym1 = Symbol('key1');
    var sym2 = Symbol('key2');
    console.log('Symbol', Symbol('key1') === Symbol('key1'));
    var max = Number.MAX_SAFE_INTEGER;
    var max1 = max + 1;
    var max2 = max + 2;
    console.log('max', max1 === max2);
    var getValue = function (value) {
        if (value instanceof Date) {
            return value.toISOString();
        }
        return String(value);
    };
    console.log('value:', getValue(123));
    console.log('value:', getValue(new Date()));
    var error = function (message) {
        throw new Error(message);
    };
    var empty = [];
    console.log('empty:', empty);
    var list = [1, 2, 3];
    var list2 = [1, 2, 3];
    var x = void 0;
    x = ['hello', 12];
    var tuple = ['a', 1];
    tuple.push(2);
    tuple.push('123');
    console.log('tuple:', tuple);
    var Direction = void 0;
    (function (Direction) {
        Direction[Direction["Center"] = 1] = "Center";
    })(Direction || (Direction = {}));
    var value = void 0;
    value = Direction;
    value = [1];
    value = [1, 'hello'];
    value = {};
    console.log('value =>', value);
}
{
    var Direction = void 0;
    (function (Direction) {
        Direction[Direction["Up"] = 0] = "Up";
        Direction[Direction["Down"] = 1] = "Down";
        Direction[Direction["Left"] = 2] = "Left";
        Direction[Direction["Right"] = 3] = "Right";
    })(Direction || (Direction = {}));
    console.log('Direction =>', Direction.Up === 0);
    console.log('Direction =>', Direction.Down === 1);
    console.log('Direction =>', Direction.Left === 2);
    console.log('Direction =>', Direction.Right === 3);
    var b = void 0;
    b = Direction.Up;
    var Direction2 = void 0;
    (function (Direction2) {
        Direction2[Direction2["Up"] = 10] = "Up";
        Direction2[Direction2["Down"] = 11] = "Down";
        Direction2[Direction2["Left"] = 12] = "Left";
        Direction2[Direction2["Right"] = 13] = "Right";
    })(Direction2 || (Direction2 = {}));
    console.log('Direction2 =>', Direction2.Up, Direction2.Down, Direction2.Left, Direction2.Right);
    var Direction3 = void 0;
    (function (Direction3) {
        Direction3["Up"] = "Up";
        Direction3["Down"] = "Down";
        Direction3["Left"] = "Left";
        Direction3["Right"] = "Right";
    })(Direction3 || (Direction3 = {}));
    var a = Direction3.Up;
    console.log('a', a);
    console.log('Direction3 =>', Direction3['Up'], Direction3.Down, Direction3.Left, Direction3.Right);
}
var Month;
(function (Month) {
    Month[Month["January"] = 0] = "January";
    Month[Month["February"] = 1] = "February";
    Month[Month["March"] = 2] = "March";
    Month[Month["April"] = 3] = "April";
    Month[Month["May"] = 4] = "May";
    Month[Month["June"] = 5] = "June";
    Month[Month["July"] = 6] = "July";
    Month[Month["August"] = 7] = "August";
    Month[Month["September"] = 8] = "September";
    Month[Month["October"] = 9] = "October";
    Month[Month["November"] = 10] = "November";
    Month[Month["December"] = 11] = "December";
})(Month || (Month = {}));
(function (Month) {
    Month.isSummer = function (month) {
        switch (month) {
            case Month.June:
            case Month.July:
            case Month.August:
                return true;
            default:
                return false;
        }
    };
})(Month || (Month = {}));
console.log('Month:', Month.isSummer(Month.May));
{
    var user = { name: 'zhang', isMale: true, say: function (words) { return words; } };
    console.log('user =>', user.say('Hello'));
    user.name = 'acb';
    var CalculateAreas = function (config) {
        var square = 100;
        if (config.width) {
            square = config.width * config.width;
        }
        return { area: square };
    };
    var options = { widdth: 5 };
    var mySquare = CalculateAreas(options);
    console.log('mySquare =>', mySquare);
}
{
    var Animal = (function () {
        function Animal() {
        }
        Animal.prototype.move = function () {
            console.log('roaming the earch...');
        };
        return Animal;
    }());
    var Cat = (function (_super) {
        (0, tslib_1.__extends)(Cat, _super);
        function Cat() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Cat.prototype.makeSound = function () {
            console.log('miao miao');
        };
        return Cat;
    }(Animal));
    var cat = new Cat();
    cat.makeSound();
    cat.move();
    var Car = (function () {
        function Car() {
        }
        Car.prototype.run = function () {
            console.log('启动...');
        };
        Car.prototype.go = function () {
            console.log('跑起来...');
        };
        Car.prototype.open = function () {
            console.log('开门...');
        };
        return Car;
    }());
    var GTR = (function (_super) {
        (0, tslib_1.__extends)(GTR, _super);
        function GTR() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        GTR.prototype.init = function () {
            this.open();
        };
        return GTR;
    }(Car));
    var car = new Car();
    var gtr = new GTR();
    gtr.init();
}
var Props = (function () {
    function Props() {
        this.children = [];
        this.speed = 500;
        this.height = 160;
        this.animation = 'easeInOutQuad';
        this.isAuto = true;
        this.autoPlayInterval = 4500;
        this.showDots = true;
    }
    return Props;
}());
exports.default = Props;
{
    var add = function (a, b) { return a + (b ? b : 0); };
    var add2 = function (a, b) {
        if (b === void 0) { b = 10; }
        return a + b;
    };
    var add3 = function (a) {
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        return rest.reduce((function (a, b) { return a + b; }), a);
    };
}
function assigned(a, b, c, d) {
    if (b === undefined && c === undefined && d === undefined) {
        b = c = d = a;
    }
    else if (c === undefined && d === undefined) {
        c = a;
        d = b;
    }
    return { top: a, right: b, bottom: c, left: d };
}
assigned(1);
assigned(1, 2);
assigned(1, 2, 3, 4);
{
    var returnItem = function (para) {
        return para;
    };
    var swap = function (tuple) {
        return [tuple[1], tuple[0]];
    };
    console.log('swap =>', swap([7, 'seven']));
    var getArrayLength = function (arg) {
        console.log('arg =>', arg.length);
        return arg;
    };
    var identity = function (arg) {
        return arg;
    };
    var myIdentity = identity;
    console.log('myIdentity =>', myIdentity(333));
    var returnItem2 = function (para) { return para; };
    var Stack = (function () {
        function Stack() {
            this.arr = [];
        }
        Stack.prototype.push = function (item) {
            this.arr.push(item);
        };
        Stack.prototype.pop = function () {
            this.arr.pop();
        };
        return Stack;
    }());
    var stack1 = new Stack();
    var getValue = function (obj, key) {
        return obj[key];
    };
    var a = {
        name: 'zhangsan',
        id: 1
    };
    getValue(a, 'id');
    var loggingIdentity = function (arg) {
        console.log('arg.length =>', arg.length);
        return arg;
    };
    loggingIdentity('123');
    loggingIdentity({ length: 10, value: 3 });
    var factory = function (type) {
        return new type();
    };
}
//# sourceMappingURL=index.js.map