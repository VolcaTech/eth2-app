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
    amount: {
        flex: 2,
        height: 15,
        textAlign: 'left',
        fontSize: 12,
        fontFamily: 'SF Display Bold',
        textTransform: 'uppercase',
        whiteSpace: 'nowrap'
    },
    phone: {
        flex: 2,
        height: 15,
        color: '#999999',
        position: 'inline-block',
        textAlign: 'left',
        fontSize: 12,
        fontFamily: 'SF Display Regular',
        textTransform: 'uppercase',
    },
    statusCellContainer: {
        flex: 3,
    },
    infoLinkContainer: {

    },
    cancelButton: {
        width: 65,
        height: 22,
        borderRadius: 10,
        borderColor: '#0099ff',
        backgroundColor: '#0099ff',
        color: '#fff',
        fontSize: 12,
        fontFamily: 'SF Display Black',
        textAlign: 'center',
        padding: 0,
        lineHeight: 1,
    },
    statusCell: {
        container: {
            height: 25,
        },
        statusText: {
            fontSize: 12,
            fontFamily: "SF Display Black"

        },
        pendingStatusText: {
            fontSize: 12,
            color: '#33aeff',
            fontFamily: "SF Display Black"
        },
        infoIcon: {
            height: 18,
            border: '2px solid #33aeff',
            color: '#33aeff',
            borderRadius: 12,
            textAlign: 'center',
            marginRight: 15,
            lineHeight: 1,
            fontSize: 15,
            paddingTop: 1,
            paddingLeft: 8,
            paddingRight: 8,
            fontFamily: 'SF Display Bold'
        },
        arrow: { display: 'inline', width: 'unset', marginLeft: 12, marginRight: 4, paddingBottom: 3 }
    }
}
