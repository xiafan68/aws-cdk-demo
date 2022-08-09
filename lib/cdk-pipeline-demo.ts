import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { CdkDemoStack } from './cdk-demo-stack';

export class MyPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, 'Pipeline', {
      pipelineName: 'MyPipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('xiafan68/aws-cdk-demo', 'master'),
        commands: ['npm ci', 'npm run build', 'npx cdk synth']
      })
    });
    pipeline.addStage(new MyPipelineAppStage(this, "test", {}))
    pipeline.addStage(new MyPipelineAppStage(this, "test-new", {}))
  }
}

export class MyPipelineAppStage extends cdk.Stage {
    
    constructor(scope: Construct, id: string, props?: cdk.StageProps) {
      super(scope, id, props);
  
      const lambdaStack = new CdkDemoStack(this, 'LambdaStack');      
    }
}