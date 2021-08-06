const { Console } = console;

/**
 * 
 * @class
 * @extends Console
 */
class StdConsole extends Console {
    /**
     * Constructor method for 
     * @param {console.ConsoleConstructorOptions} ConstructOptions 
     * @param {{"Kleur": boolean, "Prompts": boolean}} Options 
     */
    constructor(ConstructOptions = {"stdout": process.stdout, "stderr": process.stderr}, Options = {"Kleur": true, "Prompts": true}) {
        super(ConstructOptions);
        
        Options["Prompts"] ? this.Prompts = require("./CustomPrompts.js") : undefined;
        Options["Kleur"] ? this.Kleur = require("kleur") : undefined;
    }
}

module.exports = StdConsole;