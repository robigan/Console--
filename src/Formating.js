const Prompts = require("prompts");
const Kleur = require("kleur");

class PromptsCompat extends Prompts {
    constructor(Std) {
        super();
        this.Console = Std;
    }
}

module.exports = { KleurCompat };