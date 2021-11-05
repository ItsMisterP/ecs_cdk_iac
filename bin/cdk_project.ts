#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkProjectStack } from '../lib/cdk_project-stack';
import {NetworkStack} from "../lib/stacks/network_stack";
import {Tags} from "@aws-cdk/core";
import {ComputeStack} from "../lib/stacks/compute_stack";

export function tagging(construct: cdk.Construct): void{
    Tags.of(construct).add('createdBy', 'Philip Ohm')
    Tags.of(construct).add('project', 'cdk_training')
    Tags.of(construct).add('neededUntil', '2021.11.10')
}


const app = new cdk.App();

let networkStack = new NetworkStack(app, 'Networkstack', {
    vpcName: "ohm-cdk-test",
    vpcCidr: '10.0.0.0/26'
})

let compute_stack = new ComputeStack(app, 'ComputeStack', {
    network: networkStack
})



