import * as cdk from '@aws-cdk/core'
import * as dynamodb from '@aws-cdk/aws-dynamodb'

import {Construct} from '@aws-cdk/core'

export class DataStack extends cdk.Stack{
    table: any

    constructor(scope: Construct, id: string) {
        super(scope, id);

        this.createDynamoDB()
    }

    private createDynamoDB(): void{
        this.table = new dynamodb.Table(this, 'Database', {
            partitionKey: {
                name: 'id',
                type: dynamodb.AttributeType.STRING
            }
        })
    }
}