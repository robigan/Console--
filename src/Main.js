const { Console } = console;

const assertTerms = (Terms) => {
    if (!Terms && typeof Terms === "object") {
        throw new TypeError("Terms cannot be falsy and must be an object");
    } else if (!Terms.std.stdout) {
        throw new TypeError("Terms.std.stdout cannot be falsy");
    }
    Terms.others.forEach((element, index) => {
        if (!element.stdout) {
            throw new TypeError(`stdOut for Terms.others[${index}] must be specified`);
        }
    });
};

class Main {
    constructor(Terms = {
        std: {
            stdout: process.stdout,
            stderr: process.stderr,
            enabled: true,
        },
        others: [
            {
                stdout: require("fs").createWriteStream(`./logs/${Date.now()}.log`, { flags: "wx" }),
                name: "fs",
                enabled: true,
            },
        ],
    }, Options = new Map([["Kleur", true], ["Prompts", true]])) {
        assertTerms(Terms);
        //Terms.std ? super(Terms.std) : super(process.stdout);

        //this.Terms = Terms;
        this.Console = new Console(Terms.std);
        this.Consoles = new Map();

        this.Consoles.set(Terms.std.name ?? "std", this.Console);
        Terms.others.forEach((element, index) => {
            if (element.name && this.Consoles.has(element.name)) {
                throw new SyntaxError("Cannot instanitiate a new console with a name thats already registered");
            } else if (element.enabled) {
                this.Consoles.set(element.name ?? index, new Console(element));
            }
        });

        if (Options.get("Prompts")) {
            this.Prompts = require("prompts");
            this.Prompt = async (Questions, Options) => {
                return await this.Prompts(Object.assign(Terms.std, Questions), Options);
            };
        }
        Options.get("Kleur") ? this.Kleur = require("kleur") : undefined;
    }

    async runOnAll(toRunFunc) {
        this.Consoles.forEach(toRunFunc);
    }

    async assert(Statement, ...Message) {
        if (Statement) {
            return;
        } else {
            this.runOnAll((element) => {
                element.assert(false, ...Message);
            });
        }
    }

    async clear() {
        this.runOnAll((element) => {
            element.clear();
        });
    }

    async debug(...Message) {
        this.Console.log(...Message);
    }

    async error(...Message) {
        this.runOnAll((element) => {
            element.error(...Message);
        });
    }

    async log(...Message) {
        this.runOnAll((element) => {
            element.log(...Message);
        });
    }
}

module.exports = Main;