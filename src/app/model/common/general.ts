export default class GeneralModel {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
} 


export interface Car extends GeneralModel{
    brand:  string;
    client: null;
    color:  string;
    model:  string;
    plate:  string;
}
   