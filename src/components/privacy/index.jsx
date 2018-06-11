import React from "react";
import GotStuck from './../../components/common/GotStuck';
import Policy from './Policy';


const styles = {
    container: { width: '75%', margin: 'auto' },
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
    },
    policy: { display: 'block', width: '100%', marginTop: 134 }
}

class e2pPrivacyPolicy extends React.Component {
    render() {
        return (
            <div style={styles.container}>
                <div style={styles.title}>Privacy Policy</div>
                <div style={styles.updated}>Last Updated: May 17, 2018</div>
                <GotStuck />
                <div style={styles.policy}><Policy /></div>
            </div>
        )
    }
}

export default e2pPrivacyPolicy;