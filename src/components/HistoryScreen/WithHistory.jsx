import React from 'react';
import E2PCarousel from './../common/E2PCarousel';
import HistoryScreen from './index';


const WithHistory = (props) => {
    const History = (
        <div style={{ marginTop: 25 }}>
          <HistoryScreen {...props}/>
        </div>
    );
    
    return (
        <E2PCarousel
	   slides={[ props.children, History]}
	   {...props} />
    );

}


export default WithHistory;
