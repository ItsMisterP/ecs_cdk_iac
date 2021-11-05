import * as cdk from '@aws-cdk/core'
import * as ecs from '@aws-cdk/aws-ecs'
import * as autoscaling from '@aws-cdk/aws-autoscaling'
import * as ec2 from '@aws-cdk/aws-ec2'
import * as elbv2 from '@aws-cdk/aws-elasticloadbalancingv2'
import {Construct} from "@aws-cdk/core";
import {NetworkStack} from "./network_stack";
import { AutoScalingGroup } from '@aws-cdk/aws-autoscaling';

interface ComputeProps{
    network: NetworkStack
}

export class ComputeStack extends cdk.Stack{

    constructor(scope: Construct, id: string, props: ComputeProps) {
        super(scope, id);

        this.createInfra('microservice',props.network)
    }

    createInfra(name: string, network: NetworkStack){
        let cluster = new ecs.Cluster(this, name+"cluster", {
            vpc: network.vpc,
            capacity: {
                instanceType: new ec2.InstanceType('t3.micro'),
                minCapacity: 2,
                maxCapacity: 4,
                machineImage: ecs.EcsOptimizedImage.amazonLinux()
            }
        })

        const task = new ecs.Ec2TaskDefinition(this, 'HelloWorld')
        const container = task.addContainer('webserver', {
            image: ecs.ContainerImage.fromRegistry('httpd'),
            memoryLimitMiB: 512,
            cpu: 256,
        })

        container.addPortMappings({
            containerPort: 80,
            hostPort: 80,
            protocol: ecs.Protocol.TCP
        })

        const service = new ecs.Ec2Service(this, "webserver", {
            cluster: cluster,
            taskDefinition: task

        })

        let alb = new elbv2.ApplicationLoadBalancer(this, name+"Alb", {
            vpc: network.vpc,
            internetFacing: true
        })

        let listener = alb.addListener('Listener', {
            port: 80,
            open: true
        })

        service.registerLoadBalancerTargets({
            containerName: 'webserver',
            containerPort: 80,
            newTargetGroupId: 'WebserverECS',
            listener: ecs.ListenerConfig.applicationListener(listener, {
                protocol: elbv2.ApplicationProtocol.HTTP
            })
        })

        const scaling = service.autoScaleTaskCount({
            maxCapacity: 10,
            minCapacity: 4
        })

        scaling.scaleOnCpuUtilization('CPUScaling', {
            targetUtilizationPercent: 50
        })

    }

}