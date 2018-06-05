export default {
    row: {
        height: 24,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        margin: 'auto',
        marginBottom: 25
    },
    colVertAlign: {
        height: 24,
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center'},
    amount: {
        textAlign: 'left',
        fontSize: 15,
        fontFamily: 'SF Display Bold',
        textTransform: 'uppercase',
        whiteSpace: 'nowrap'
    },
    phone: {
        color: '#999999',
        position: 'inline-block',
        textAlign: 'center',
        fontSize: 15,
        fontFamily: 'SF Display Regular',
        textTransform: 'uppercase',
    },
    statusCellContainer: {
    },
    infoLinkContainer: {

    },
    
    statusCell: {
        container: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
        },
        statusText: {
            fontSize: 15,
            fontFamily: "SF Display Bold"

        },
        pendingStatusText: {
            fontSize: 15,
            color: '#33aeff',
            fontFamily: "SF Display Bold"
        },
        infoIcon: {
            border: '1px solid #33aeff',
            color: '#33aeff',
            borderRadius: 12,
            textAlign: 'center',
            lineHeight: 1,
            fontSize: 16,
            paddingLeft: 8,
            paddingRight: 8,
            fontFamily: 'SF Display Regular',
            verticalAlign: 'text-top'
        },
        arrow: { display: 'inline', width: 'unset', marginLeft: 12, marginRight: 4, paddingBottom: 3 }
    }
}
