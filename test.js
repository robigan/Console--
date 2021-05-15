class Super {
    static whoami() {
        return "Super";
    }
    lognameA() {
        console.log(Super.test());
    }
    lognameB() {
        console.log(this.constructor.whoami());
    }

    test() {
        console.log("I am Super's test!");
    }
}
class Sub extends Super {
    static whoami() {
        return "Sub";
    }

    test() {
        console.log("I am Sub's test!");
    }

    test2() {
        console.log(super.__proto__);
    }
}
//new Sub().lognameA(); // Super
//new Sub().lognameB(); // Sub
new Sub().test2();