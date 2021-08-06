const prompts = require("prompts");

/**
 * @typedef PromptObject
 * @property {String | Function} type
 * @property {String | Function} name
 * @property {String | Function} message
 * @property {String | Function | function(): Promise} [initial]
 * @property {Function | function(): Promise} [format]
 * @property {Function } [onRender]
 * @property {Function } [onState]
 */

/**
 * 
 * @async
 * @function
 * @param {Array.<PromptObject> | PromptObject} questions 
 * @param {{"onSubmit"?: Function, "onCancel"?: Function}} options 
 * @param {ReadableStream} stdin 
 * @param {WritableStream} stdout 
 * @returns {prompts.Answers<string>}
 */
const customPrompt = async (questions, options, stdin, stdout) => {
    questions = Object.assign(questions, {"stdin": stdin, "stdout": stdout});
    const response = await prompts(questions, options);

    return response;
};

customPrompt.override = prompts.override;
customPrompt.inject = prompts.inject;
customPrompt._prompts = prompts;

module.exports = customPrompt;