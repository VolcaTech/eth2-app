import React, { Component } from "react";
import GotStuck from './../components/common/GotStuck';
import Summary from './Summary';


const styles = {
    container: { width: '75%', margin: 'auto' },
    row: {
        textAlign: 'center'
    },
    col1: { padding: 0, marginBottom: 140 },
    title: {
        fontSize: 36,
        fontFamily: 'SF Display Black',
        textAlign: 'left',
        lineHeight: 1,
        marginBottom: 50,
    }
}

class e2pTos extends React.Component {
    render() {
        return (
            <div style={styles.container}>
                <div style={styles.title}>Terms of Service</div>
                <div style={{ display: 'block', width: '100%', }}><Summary /></div>
                <GotStuck />
            </div>
        )
    }
}

export default e2pTos;