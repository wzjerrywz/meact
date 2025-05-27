 import * as core from '@actions/core'

import * as exec from '@actions/exec'


type InputParams = {
  text: string
}

function validateInputs(params: Partial<InputParams>): InputParams {
  if (!params.text) throw new Error('Text input is required')
  return params as InputParams
}

async function run(): Promise<void> {
  try {

    await exec.exec('ls', ['./'])

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
  } catch (error) {
    core.setFailed(error instanceof Error ? error.message : 'Unknown error')
  }
}


// run
run()
