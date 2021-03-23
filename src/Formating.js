const Prompts = require("prompts");
const Kleur = require("kleur");

class PromptsCompat {
    constructor(Std = { stdin: process.stdin, stdout: process.stdout }) {
        this.Std = Std;
        this.Prompts = Prompts;
    }

    async Prompt(Questions, Options) {
        return await Prompts(Object.assign(this.Std, Questions), Options);
    }
}

module.exports = { PromptsCompat };