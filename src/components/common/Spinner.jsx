import React from 'react';

const Spinner = () => (
    <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
);


export const SpinnerOrError = ({fetching, error }) => (
	    <div style={{ height: 28, textAlign: 'center', paddingTop: 8 }}>
	      { fetching ?
		  <div style={{width: 20, margin: 'auto'}}>
			<Spinner/>			
		      </div> :
		      <span style={{color: '#ef4234', fontSize: 9}}>{error}</span>
		      }			   
	    </div>		
);



export default Spinner;
