import React from "react";
import GotStuck from './../../components/common/GotStuck';
import Summary from './Summary';
import Terms from './Terms';


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
        marginBottom: 12,        
    },
    updated: {
        fontSize: 24,
        fontFamily: 'SF Display Regular',
        color: '#999999',
        textAlign: 'left',
        marginBottom: 75,
    }
}

class e2pTos extends React.Component {
    render() {
        return (
            <div style={styles.container}>
                <div style={styles.title}>Terms of Service</div>
                <div style={styles.updated}>Last Updated: May 16, 2018</div>                
                <div style={{ display: 'block', width: '100%', }}><Summary /></div>
                <GotStuck/>                
                <div style={{ display: 'block', width: '100%', marginTop: 134}}><Terms /></div>                
            </div>
        )
    }
}

export default e2pTos;