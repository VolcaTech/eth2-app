import React from 'react';

const Spinner = () => (
    <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
);


export const SpinnerOrError = ({fetching, error }) => {
    if (!(fetching || error)) { return null; }
    return (
	    <div style={{ height: 28, textAlign: 'center', paddingTop: 8 }}>
	      { fetching ?
		  <div style={{width: 20, margin: 'auto'}}>
			<Spinner/>			
		      </div> :
		      <span style={{color: '#E64437', fontSize: 12,
				    fontFamily: 'SF Display Regular'}}>{error}</span>
		      }			   
	    </div>
    );
}

export const Loader = ({text="Loading page...", textLeftMarginOffset=-15}) => (
    <div>
      <div className='centered-lds'>
	<div className="lds-ring"><div></div><div></div><div></div><div></div></div>
	<div style={{color: '#0099FF', marginLeft: textLeftMarginOffset }}>{text}</div>	
    </div>
    </div>

)


export default Spinner;
