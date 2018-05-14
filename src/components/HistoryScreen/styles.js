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
	textAlign: 'center',
	fontSize: 15,
	fontFamily: 'SF Display Bold',
	textTransform: 'uppercase'
    },
    phone: {
	flex: 2,
	height: 15,
	position: 'inline-block',
	textAlign: 'center',
	fontSize: 15,
	fontFamily: 'SF Display Regular',
	textTransform: 'uppercase',
	opacity: 0.4
    },
    statusCellContainer: {
	flex: 3,
    },
    infoLinkContainer: {
	flex: 1
    },        
    cancelButton: {
        width: 84,	
        height: 24,
        borderRadius: 10,
        borderColor: '#f04234',
        backgroundColor: '#f04234',
        color: '#fff',
        fontSize: 18,
        fontFamily: 'SF Display Black',
        textAlign: 'center',
        padding: 0,
        lineHeight: 1,
    },
    statusCell: {
	container: {	    
            height: 25,
            paddingLeft: 17,
	},
	statusText: {	    
	    fontSize: 18,
	},
	pendingStatusText: {	    
	    fontSize: 18,
	    color: '#33aeff',
	    opacity: 0.4,
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
	}
    }
}
