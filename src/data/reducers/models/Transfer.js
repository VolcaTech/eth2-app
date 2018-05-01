import { attr, Model } from 'redux-orm';
import * as actions  from '../../../actions/types';


// export const generateAssetTransferId = ({txHash, address, tokenAddress, direction}) => {
//     return [txHash.toLowerCase(), address.toLowerCase(), tokenAddress.toLowerCase(), direction].join('-');
// }

export default class AssetTransfer extends Model {
    static modelName = 'AssetTransfer';
    static fields = {
	id: attr(),
	txHash: attr(),
	senderAddress: attr(),
	direction: attr(),
	timestamp: attr(),
	amount: attr(),
	fee: attr(),
	transferId: attr(), // sha3(phone, secretCode)
	secretCode: attr(),
	transitAddress: attr(),
	receiverPhone: attr(),
	receiverAddress: attr(),
	status:  attr() // pending, sent, completed, canceled, error	
    }
    
    static reducer(action, model) {
	switch (action.type) {
	case actions.CREATE_TRANSFER: {
	    const transfer = action.payload;
	    
	    // force address to be lowercased
	    // transfer.address = transfer.address.toLowerCase();
	    // transfer.tokenAddress = transfer.tokenAddress.toLowerCase();
	    // transfer.counterpartyAddress = transfer.counterpartyAddress.toLowerCase();
	    
	    model.create(transfer);	    	 
	    
	    return undefined;
	}
	case actions.UPDATE_TRANSFER: {
	    const updateParams = action.payload;
	    model.upsert(updateParams);

	    return undefined;
	}
	// case actions.DELETE_ASSET_TRANSFER: {
	//     return model.withId(action.payload).delete();
	// }
	default:
	    return undefined;
	}
    }
}
