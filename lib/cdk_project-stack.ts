import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3'
import {Tags} from "@aws-cdk/core";

export class CdkProjectStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.addS3Bucket("ohm-cdk-bucket")
  }

  addS3Bucket(name:string):void{
    let bucket = new s3.Bucket(this, name, {
      versioned: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true
    })
    this.tagging(bucket)
  }

  tagging(construct: cdk.Construct): void{
    Tags.of(construct).add('createdBy', 'Philip Ohm')
    Tags.of(construct).add('project', 'cdk_training')
    Tags.of(construct).add('neededUntil', '2021.11.10')
  }
}
