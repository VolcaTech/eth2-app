import React from 'react';

const styles = {
    loaderText: {
	height: 40,
	color: '#000000',
	fontFamily: 'SF Display Bold',
	fontSize: 12,
	letterSpacing: 1.45,
    },
    error: {
	color: '#E64437',
	fontSize: 12,
	fontFamily: 'SF Display Regular'
    },
    spinnerOrErrorContainer: {
	height: 28,
	textAlign: 'center',
	paddingTop: 8
    },
    spinner: {
	width: 20,
	margin: 'auto'
    }
}


const Spinner = () => (
    <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
);


export const SpinnerOrError = ({fetching, error }) => {
    if (!(fetching || error)) { return null; }
    return (
	    <div style={styles.spinnerOrErrorContainer}>
	      { fetching ?
		  <div style={styles.spinner}>
			<Spinner/>			
		      </div> :
		      <span style={styles.error}>{error}</span>
		      }			   
	    </div>
    );
}

export const Error = ({fetching, error }) => {
    if (!(fetching || error)) { return null; }
    return (
	    <div style={styles.spinnerOrErrorContainer}>
		      <span style={styles.error}>{error}</span>
	    </div>
    );
}


export const Loader = ({text="Loading page...", textLeftMarginOffset=-15}) => (
    <div>
      <div className='centered-lds'>
	<div className="lds-ring"><div></div><div></div><div></div><div></div></div>
	<div style={{...styles.loaderText, marginLeft: textLeftMarginOffset }}>{text}</div>	
    </div>
    </div>

)

export const ButtonLoader = () => (
	<div className="lds-button"><div></div><div></div><div></div><div></div></div>

)


export default Spinner;
