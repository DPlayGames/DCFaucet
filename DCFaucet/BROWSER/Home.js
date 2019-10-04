DCFaucet.Home = CLASS({

	preset : () => {
		return VIEW;
	},

	init : (inner, self) => {
		
		let amountInput;
		let amountPanel;
		let accountIdPanel;
		
		let wrapper = UUI.V_CENTER({
			style : {
				position : 'absolute',
				width : '100%',
				height : '100%',
				backgroundImage : '/DCFaucet/R/background.jpg'
			},
			c : DIV({
				style : {
					margin : 'auto',
					width : 608,
					paddingLeft : 122
				},
				c : [DIV({
					style : {
						marginTop : 82,
						flt : 'left'
					},
					c : [H3({
						style : {
							color : '#949191',
							textAlign : 'right'
						},
						c : [MSG('ETNER_DC_AMOUNT_INPUT').substring(0, MSG('ETNER_DC_AMOUNT_INPUT').indexOf('DC')), SPAN({
							style : {
								color : '#ab0000'
							},
							c : 'DC'
						}), MSG('ETNER_DC_AMOUNT_INPUT').substring(MSG('ETNER_DC_AMOUNT_INPUT').indexOf('DC') + 2)]
					}), amountInput = UUI.FULL_INPUT({
						style : {
							marginTop : 6,
							backgroundColor : '#e0dfcb',
							width : 150,
							height : 26,
							borderRadius : 2
						},
						inputStyle : {
							textAlign : 'right',
							fontSize : 24
						}
					})]
				}), DIV({
					style : {
						marginLeft : 5,
						flt : 'left'
					},
					c : [H1({
						style : {
							color : '#949191'
						},
						c : [MSG('TITLE').substring(0, MSG('TITLE').indexOf('DC')), SPAN({
							style : {
								color : '#ab0000',
								fontSize : 30
							},
							c : 'DC'
						}), MSG('TITLE').substring(MSG('TITLE').indexOf('DC') + 2)]
					}), DIV({
						style : {
							width : 150,
							height : 137,
							backgroundImage : '/DCFaucet/R/faucet.png',
							cursor : 'pointer'
						},
						c : DIV({
							style : {
								paddingLeft : 10,
								paddingTop : 82,
								color : '#e0dfcc'
							},
							c : MSG('GET_DC_BUTTON')
						}),
						on : {
							tap : () => {
								
								DPlayInventory.getAccountId((accountId) => {
									
									// 계정 ID를 가져오지 못하면 로그인이 되어있지 않은 경우
									if (accountId === undefined) {
										DPlayInventory.login();
									}
									
									else {
										
										let amount = REAL(amountInput.getValue());
										
										if (isNaN(amount) === true) {
											Yogurt.Alert({
												msg : MSG('ENTER_DC_AMOUNT_MESSAGE')
											});
										} else {
											DPlayCoinContract.createDCForTest(DPlayCoinContract.getActualPrice(amount), () => {
												REFRESH();
											});
										}
									}
								});
							}
						}
					})]
				}), CLEAR_BOTH(), DIV({
					style : {
						marginTop : 20,
						marginLeft : 282
					},
					c : [H3({
						style : {
							flt : 'left',
							color : '#949191'
						},
						c : [IMG({
							src : '/DCFaucet/R/dc.png'
						}), ' ', MSG('ACCOUNT_ID')]
					}), amountPanel = H3({
						style : {
							marginTop : 10,
							flt : 'right',
							color : '#949191'
						}
					}), CLEAR_BOTH(), accountIdPanel = DIV({
						style : {
							marginTop : 5,
							backgroundColor : '#e0dfcb',
							width : 315,
							height : 13,
							borderRadius : 2,
							fontSize : 13,
							padding : 5,
							color : '#000',
							textAlign : 'center'
						}
					})]
				}),
				
				UUI.V_CENTER({
					style : {
						marginTop : -25,
						width : 104,
						height : 27,
						backgroundImage : '/DCFaucet/R/etherbutton.png',
						cursor : 'pointer',
						textAlign : 'center',
						color : '#979b9b'
					},
					c : MSG('CHARGE_ETHER_BUTTON'),
					on : {
						tap : () => {
							open('http://chargeether.dplay.games');
						}
					}
				})]
			})
		}).appendTo(BODY);
		
		DPlayInventory.getAccountId((accountId) => {
			
			if (accountId !== undefined) { 
				
				accountIdPanel.append(accountId);
				
				DPlayCoinContract.balanceOf(accountId, (balance) => {
					
					let msg = MSG('DC_BALANCE');
					
					amountPanel.append(msg.substring(0, msg.indexOf('{n}')));
					
					amountPanel.append(SPAN({
						style : {
							color : '#ab0000'
						},
						c : DPlayCoinContract.getDisplayPrice(balance)
					}));
					
					msg = msg.substring(msg.indexOf('{n}') + 3);
					
					amountPanel.append(msg.substring(0, msg.indexOf('DC')));
					
					amountPanel.append(SPAN({
						style : {
							color : '#ab0000'
						},
						c : 'DC'
					}));
					
					amountPanel.append(msg.substring(msg.indexOf('DC') + 2));
				});
			}
		});
		
		DPlayInventory.getNetworkName((networkName) => {
			if (networkName === 'Mainnet') {
				Yogurt.Alert({
					msg : MSG('PLEASE_USE_TESTNET')
				});
			}
		});
		
		inner.on('close', () => {
			wrapper.remove();
		});
	}
});