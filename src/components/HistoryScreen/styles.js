export default {
    row: {
	width: 334,
	height: 24,
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	flexDirection: 'row',
	margin: 'auto',
	marginBottom: 25
    },
    amount: {
    width: 93,
    height: 15,
	position: 'inline-block',
	float: 'left',
	fontSize: 12,
	fontFamily: 'SF Display Bold',
	textTransform: 'uppercase'
    },
    phone: {
        width: 115,
    height: 15,
	position: 'inline-block',
	textAlign: 'center',
	fontSize: 12,
	fontFamily: 'SF Display Regular',
	textTransform: 'uppercase',
	opacity: 0.4
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
		    marginRight: 20,
    },
    statusCellContainer: {
	position: 'inline-block',
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
    },
    statusCell: {
	container: {
	    position: 'inline-block',
        display: 'flex',
        width: 164, 
        height: 25,
        paddingLeft: 17,
	    justifyContent: 'space-between',
	    alignItems: 'center',
	},
	statusText: {
	    textAlign: 'center',
	    float: 'right',
	    fontSize: 18,
	    marginRight: 20,
	},
	pendingStatusText: {
	    textAlign: 'center',
	    float: 'right',
	    fontSize: 18,
	    marginRight: 20,	    
	    color: '#33aeff',
	    opacity: 0.4,
	    fontFamily: "SF Display Black"		       	    
	},
	infoIcon: {
	    width: 18,
	    height: 18,
	    border: '2px solid #33aeff',
	    color: '#33aeff',
	    borderRadius: 9,
	    textAlign: 'center',
	    lineHeight: 1,
	    fontSize: 13,
        paddingTop: 1,
        paddingLeft: 1,
        fontFamily: 'SF Display Bold'
	}
    }
}
