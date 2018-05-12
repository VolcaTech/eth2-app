import React, { Component } from "react";


class e2pLanding extends React.Component {


    render() {
        return (
            <div style={styles.container}>
                <div style={styles.textLeft}><div style={{ fontFamily: 'SF Display Bold', display: 'inline' }}>Eth2Phone</div>&nbsp; serves the proof-of-concept reasons and is an aplha version. Please be aware that systems bugs are possible at that stage. We will appreciate if you inform us any of them to eth2phone@gmail.com</div>
                <div style={styles.textRight}>
                    <div>FAQ</div>
                    <div>Terms of Use</div>
                    <div>Privacy Policy</div>
                </div>
            </div>

        )
    }
}

const styles = {
    container: { display: 'flex', flexDirection: 'row', justifyContent: 'space-around', width: '100%', height: 160, backgroundColor: '#f5f5f5', alignItems: 'center' },
    textLeft: { height: 60, width: '40%', fontSize: 16, fontFamily: 'SF Display Regular' },
    textRight: { height: 60, width: '40%', display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', fontFamily: 'SF Display Black', fontSize: 20}

}

export default e2pLanding;