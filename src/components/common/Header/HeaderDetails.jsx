import React, { Component } from "react";


const styles = {
    container: {
	width: "100%",
	overflow: 'hidden',
	display: 'flex',
	justifyContent: 'space-between',
	boxShadow: '0px 30px 30px -35px rgba(0, 0, 0, 0.1)',
	alignItems: 'left',
	flexDirection: 'column',
	margin: "auto",
	textAlign: "left",
	marginBottom: 15 
    },
    headerDetailsBlack: {
	display: 'flex',
	flexDirection: 'row',
	fontSize: 14,
	fontFamily: "SF Display Bold",
	lineHeight: 1.1,
	marginRight: 2
    },
    headerDetailsGrey: {
	fontSize: 14,
	fontFamily: "SF Display Bold",
	color: '#a9a9a9',
	lineHeight: 1.1
    },
    headerDetailsGreen: {
	fontSize: 14,
	fontFamily: "SF Display Bold",
	color: "#2bc64f",
	lineHeight: 1.1
    }
}


const HeaderDetails = ({ height, address, contract, networkName, networkId, balance }) => {
    
    return (
        <div style={{...styles.container, height}}>
            <div style={{ marginTop: 8 }}>
                <div style={styles.headerDetailsGrey}>
                    ADDRESS
	      </div>
                <div style={styles.headerDetailsGreen}>
                    {address}
                </div>
            </div>
            <div>
                <div style={styles.headerDetailsGrey}>
                    CONTRACT
	      </div>
                <div style={styles.headerDetailsBlack}>
                    {contract}
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', width: '72%', justifyContent: 'space-between', marginBottom: 17 }}>
                <div>
                    <div style={styles.headerDetailsGrey}>
                        NETWORK
              </div>
                    <div style={styles.headerDetailsBlack}>
                        {networkName}
                        <i style={{ color: (networkId == '1' ? '#2bc64f' : 'orange'), fontSize: 8, marginLeft: 5, paddingTop: 4 }} className="fa fa-circle"></i>
                    </div>
                </div>
                <div>
                    <div style={styles.headerDetailsGrey}>
                        BALANCE
              </div>
                    <div style={styles.headerDetailsBlack}>
                        {balance} <span style={styles.headerDetailsGrey}>&nbsp;ETH</span>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default HeaderDetails;
