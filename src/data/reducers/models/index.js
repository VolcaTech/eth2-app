import { ORM, createReducer } from 'redux-orm';
import Transfer from './Transfer';


export const schema = new ORM();

schema.register(
    Transfer
);


export default createReducer(schema);
