import * as AWS from 'aws-sdk'
import { ProcessCredentials } from 'aws-sdk'
import { TodoItem } from '../models/TodoItem'
import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
//import { DocumentClient } from 'aws-sdk/clients/dynamodb'
//import { createLogger } from '../utils/logger'
//import { TodoItem } from '../models/TodoItem'
//import { TodoUpdate } from '../models/TodoUpdate';

const XAWS = AWSXRay.captureAWS(AWS)
//console.log(XAWS)
//const logger = createLogger('TodosAccess')
//console.log(logger)*/


const  todosTable = process.env.TODOS_TABLE
const docClient: DocumentClient = createDynamoDBClient()

// TODO: Implement the dataLayer logic
export async function creatToDo(todo: TodoItem): Promise<TodoItem> {
    await docClient.put({
        TableName: todosTable,
        Item: todo
    }).promise()
    return todo
}

function createDynamoDBClient(){
    if(process.env.IS_OFFLINE){
        console.log('Creating a local DynamoDB instance')
        return new XAWS.DynamoDB.DOcumentClient({
            region: 'localhost',
            endpoint: 'http://localhost:8000'
        })
    }
}
