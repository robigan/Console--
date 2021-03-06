const { Console } = console;

const assertOptions = (Options) => {
    Options ?? console.error("Options must be specified");
    Options.others.forEach((element, index) => {
        element.stdout ?? console.error(`stdOut for Options.others[${index}] must be specified`);
    });
};

class Main extends Console {
    constructor(Options = {
        std: {
            stdout: process.stdout, 
            stderr: process.stderr,
            enabled: true,
        },
        others: [
            {
                stdout: require("fs").createWriteStream(`./logs/${Date.now()}.log`, {flags: "wx"}),
                enabled: true,
            },
        ],
    }) {
        assertOptions(Options);
        Options.std ? super(Options.std) : super(process.stdout);
        this.Options = Options;
        this.Consoles = new Map();
        Options.others.forEach(element => {
            this.Consoles.set(Math.random(), new Console(element));
        });
    }

    log(...Message) {
        super.log(...Message);
        this.Consoles.forEach(async (element) => {
            element.log(...Message);
        });
    }

    debug(...debugArgs) {
        super.log(...debugArgs);
    }
}

module.exports = Main;