import { createSelector } from 'reselect';
import { createSelector as createOrmSelector } from 'redux-orm';
import { schema } from './reducers/models';

const ormSelector = state => state.orm;


export const getAllTransfers = createSelector(
    ormSelector,
    createOrmSelector(schema, session => (session.Transfer.all().toRefArray()))
);

export const getPendingTransfers = createSelector(
    ormSelector,
    createOrmSelector(schema, session => (session.Transfer.filter(transfer => transfer.status === 'pending').toRefArray()))
);
