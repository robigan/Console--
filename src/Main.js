const { Console } = console;
const { PromptsCompat } = require("./Formating.js");

const assertOptions = (Options) => {
    if (!Options && typeof Options === "object") {
        throw new TypeError("Options cannot be falsy and must be an object");
    } else if (!Options.std.stdout) {
        throw new TypeError("Options.std.stdout cannot be falsy");
    }
    Options.others.forEach((element, index) => {
        if (!element.stdout) {
            throw new TypeError(`stdOut for Options.others[${index}] must be specified`);
        }
    });
};

class Main {
    constructor(Options = {
        std: {
            stdout: process.stdout, 
            stderr: process.stderr,
            enabled: true,
        },
        others: [
            {
                stdout: require("fs").createWriteStream(`./logs/${Date.now()}.log`, {flags: "wx"}),
                name: "fs",
                enabled: false,
            },
        ],
    }) {
        assertOptions(Options);
        //Options.std ? super(Options.std) : super(process.stdout);

        this.Options = Options;
        this.Console = new Console(Options.std);
        this.Consoles = new Map();
        this.Kleur = new PromptsCompat(this.Console);

        this.Consoles.set(Options.std.name ?? "std", this.Console);
        Options.others.forEach((element, index) => {
            if (element.name && this.Consoles.has(element.name)) {
                throw new SyntaxError("Cannot instanitiate a new console with a name thats already registered");
            } else if (element.enabled) {
                this.Consoles.set(element.name ?? index, new Console(element));
            }
        });
    }

    async runOnAll(toRunFunc) {
        this.Consoles.forEach(toRunFunc);
    }

    assert(Statement, ...Message) {
        if (Statement) {
            return;
        } else {
            this.runOnAll((element) => {
                element.assert(false, ...Message);
            });
        }
    }

    clear() {
        this.runOnAll((element) => {
            element.clear();
        });
    }
    
    debug(...Message) {
        this.Console.log(...Message);
    }

    error(...Message) {
        this.runOnAll((element) => {
            element.error(...Message);
        });
    }

    log(...Message) {
        this.runOnAll((element) => {
            element.log(...Message);
        });
    }
}

module.exports = Main;