 import * as core from '@actions/core'

import * as exec from '@actions/exec'
import { capture } from './cmd'


type InputParams = {
  text: string
}

function validateInputs(params: Partial<InputParams>): InputParams {
  if (!params.text) throw new Error('Text input is required')
  return params as InputParams
}

async function run(): Promise<void> {
  try {

    const url = 'https://download.java.net/java/GA/jdk17/0d483333a00540d886896bac774ff48b/35/GPL/openjdk-17_linux-x64_bin.tar.gz';

    await exec.exec('wget', [url]);

    await exec.exec('tar', ['-xf', 'openjdk-17_linux-x64_bin.tar.gz']);

    const jdkHome = await capture('pwd', [])  + '/jdk-17' ;
    core.info(`jdkHome: ${jdkHome}`);

    await exec.exec('chmod', ['+x', `${jdkHome}/bin/java`]);


    await exec.exec(jdkHome + '/bin/java', ['-version']);

    await exec.exec('ls', ['./'])

    await exec.exec('npmxa', ['install', 'hello', 'world'])

    const inputs = validateInputs({
      text: core.getInput('hello-world')
    })

    core.info(`Processing with: ${JSON.stringify(inputs)}`)
    
    const result = {
      original: inputs,
      processedAt: new Date().toISOString(),
      message: `Received ${inputs.text} with 1 selection`
    }

    core.setOutput('report', JSON.stringify(result))
    core.summary
      .addHeading('Action Results')
      .addTable([
        ['Field', 'Value'],
        ['Text', inputs.text]
      ])
      .write()
  } catch (error: any) {
       core.setFailed(error instanceof Error ? error.message : 'Unknown error') ;
       throw new Error(error);
  }
}


// run
run()
