const { Console } = console;

const assertOptions = (Options) => {
    Options ?? console.error("Options must be specified");
    Options.stdOut ?? console.error("Options.stdOut must be specified");
    this.Options = Options;
};

class Main extends Console {
    constructor(Options = {
        stdOut: process.stdout, 
        stdErr: process.stderr, 
        colorMode: "auto",
        fileOut: `./logs/${Date.now()}.log`,
        stdOverwrite: false,
        write: true
    }) {
        assertOptions(Options);
        if ( Options.stdOverwrite ) {
            super({ stdout: Options.stdOut, stderr: Options.stdErr ?? Options.stdOut, colorMode: Options.colorMode ?? "auto" });
        } else {
            super(process.stdout);
        }
    }
}

module.exports = Main;