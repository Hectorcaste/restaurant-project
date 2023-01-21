import { Injectable } from "@nestjs/common";
import {DynamoDBClient,QueryCommand,AttributeValue } from '@aws-sdk/client-dynamodb';
import {Restaurant} from './entity/restaurant.entity';

/**
 * restaurant repository
 * queries the restaurants
 */

@Injectable()
export class RestaurantRepository{
private tableName: string
private db: DynamoDBClient

/**
 * initializes the dynamo client
 */
constructor() {
    this.tableName = 'test';
    this.db = new DynamoDBClient({
        endpoint:'http://localhost:8000',
    })
}


/**
 * function that queries restaurantes filtering by the plates they offer
 * @param plates plates to filter the restaurants
 * @returns a list of restaurants that offers the plates given by parameters
 * null if an error occurs
 */
async getRecommendation(plates:[string]):Promise<Restaurant[]> {


    var FilterExpression =""
    var expression: Record<string,AttributeValue> = { ":PK": { S: "#RESTAURANT" }}
    
    plates.forEach(((plate,index) => {
        if (index == 0){
           FilterExpression += `contains(Plates,:plates${index})`
        }
        else{
            FilterExpression += ` and contains(Plates,:plates${index})`
        }
        expression[`:plates${index}`] = {S: `${plate}`}
    }))
    var restaurantsAns : Restaurant[] = [];



    try{
       return await this.db.send( new QueryCommand({
        TableName:this.tableName,
        KeyConditionExpression: "PK = :PK",
        FilterExpression: FilterExpression,
        ExpressionAttributeValues: expression,
       })).then((data) =>{
        data.Items.forEach((item =>{
            restaurantsAns.push({id:item.SK.S,name:item.Name.S,pk:item.PK.S})
        } ))
        return restaurantsAns
       });
     
    }catch(err){
        return null
    }
}
}

