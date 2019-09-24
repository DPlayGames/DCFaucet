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
						c : [SPAN({
							style : {
								color : '#ab0000'
							},
							c : 'DC'
						}), ' 수량 입력']
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
						c : [SPAN({
							style : {
								color : '#ab0000',
								fontSize : 30
							},
							c : 'DC'
						}), ' Faucet']
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
							c : 'DC를 받습니다.'
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
												msg : 'DC를 입력해주세요.'
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
						}), ' 계정 ID']
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
				})]
			})
		}).appendTo(BODY);
		
		DPlayInventory.getAccountId((accountId) => {
			accountIdPanel.append(accountId);
			
			DPlayCoinContract.balanceOf(accountId, (balance) => {
				
				amountPanel.append(SPAN({
					style : {
						color : '#ab0000'
					},
					c : DPlayCoinContract.getDisplayPrice(balance) + ' DC'
				}));
				
				amountPanel.append(' 보유중');
			});
		});
		
		DPlayInventory.getNetworkName((networkName) => {
			if (networkName === 'Mainnet') {
				Yogurt.Alert({
					msg : 'DC Faucet은 테스트넷에서만 작동하는 DC 지급 서비스입니다. 메인넷에서는 이용할 수 없습니다. 테스트 네트워크로 변경해주시기 바랍니다.'
				});
			}
		});
		
		inner.on('close', () => {
			wrapper.remove();
		});
	}
});