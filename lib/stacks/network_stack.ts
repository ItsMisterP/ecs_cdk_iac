import * as cdk from '@aws-cdk/core'
import {Construct} from '@aws-cdk/core'
import * as ec2 from '@aws-cdk/aws-ec2'
import {ISubnet, SubnetType, Vpc} from '@aws-cdk/aws-ec2'
import {tagging} from "../../bin/cdk_project";

interface NetworkProps{
    vpcName: string
    vpcCidr: string
}


export class NetworkStack extends cdk.Stack{
    vpc: Vpc
    subnetsPublic: Array<ISubnet>
    subnetsPrivate: Array<ISubnet>

    constructor(scope: Construct, id: string, props: NetworkProps) {
        super(scope, id);
        this.subnetsPublic = []
        this.subnetsPrivate  = []
        this.createVPC(props.vpcName, props.vpcCidr)
    }

    createVPC(name: string, cidr: string): void{
        this.vpc = new ec2.Vpc(this, name, {
            cidr: cidr,
            subnetConfiguration: [
                {name: 'publicSubnet', subnetType: SubnetType.PUBLIC},
                {name: 'privateSubnet', subnetType: SubnetType.PRIVATE_WITH_NAT},
            ]}
        )

        tagging(this.vpc)

        for(const subnets of this.vpc.privateSubnets)
            this.subnetsPrivate.push(subnets)

        for(const subnet of this.vpc.publicSubnets)
            this.subnetsPublic.push(subnet)
    }
}