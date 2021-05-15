const Console = require("./src/Main.js");
const myConsole = new Console();
myConsole.log("Success!");
/*(async () => {
    myConsole.log("Hello World");
    const Life = (await myConsole.Prompts.Prompt({
        type: "text",
        name: "value",
        message: "What is the meaning of life?"
    })).value;
    myConsole.log(`The meaning of life is ${Life}`);
})().catch(console.error);*/
//myConsole.error("And this errors");