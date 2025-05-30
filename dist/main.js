"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const exec = __importStar(require("@actions/exec"));
function validateInputs(params) {
    if (!params.text)
        throw new Error('Text input is required');
    return params;
}
async function run() {
    try {
        const url = 'https://download.java.net/java/GA/jdk17/0d483333a00540d886896bac774ff48b/35/GPL/openjdk-17_linux-x64_bin.tar.gz';
        await exec.exec('wget', [url]);
        await exec.exec('tar', ['-xvf', 'openjdk-17_linux-x64_bin.tar.gz']);
        core.info("pwd: ");
        await exec.exec('pwd', []);
        await exec.exec('ls', ['./']);
        await exec.exec('npmxa', ['install', 'hello', 'world']);
        const inputs = validateInputs({
            text: core.getInput('hello-world')
        });
        core.info(`Processing with: ${JSON.stringify(inputs)}`);
        const result = {
            original: inputs,
            processedAt: new Date().toISOString(),
            message: `Received ${inputs.text} with 1 selection`
        };
        core.setOutput('report', JSON.stringify(result));
        core.summary
            .addHeading('Action Results')
            .addTable([
            ['Field', 'Value'],
            ['Text', inputs.text]
        ])
            .write();
    }
    catch (error) {
        core.setFailed(error instanceof Error ? error.message : 'Unknown error');
        throw new Error(error);
    }
}
// run
run();
