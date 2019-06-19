DCFaucet.Home = CLASS({

	preset : () => {
		return VIEW;
	},

	init : (inner, self) => {
		
		let tokenNameWrapper;
		let tokenSymbolWrapper;
		let tokenDecimalsWrapper;
		
		let totalSupplyWrapper;
		let balanceWrapper;
		
		let content = DIV({
			c : [DIV({
				c : ['Token Name: ', tokenNameWrapper = SPAN({
					c : '...'
				})]
			}), DIV({
				c : ['Token Symbol: ', tokenSymbolWrapper = SPAN({
					c : '...'
				})]
			}), DIV({
				c : ['Token Decimals: ', tokenDecimalsWrapper = SPAN({
					c : '...'
				})]
			}), DIV({
				c : ['Total Supply: ', totalSupplyWrapper = SPAN({
					c : '...'
				})]
			}), DIV({
				c : ['Balance: ', balanceWrapper = SPAN({
					c : '...'
				})]
			}), DIV({
				c : [A({
					c : 'DC 충전하기',
					on : {
						tap : () => {
							
							Yogurt.Prompt({
								msg : '충전할 양을 입력해주세요.'
							}, (amount) => {
								DPlayCoinContract.createDCForTest(DPlayCoinContract.getActualPrice(REAL(amount)).toString());
							});
						}
					}
				})]
			})]
		});
		
		DPlayCoinContract.name((tokenName) => {
			tokenNameWrapper.empty();
			tokenNameWrapper.append(tokenName);
		});
		
		DPlayCoinContract.symbol((tokenSymbol) => {
			tokenSymbolWrapper.empty();
			tokenSymbolWrapper.append(tokenSymbol);
		});
		
		DPlayCoinContract.decimals((tokenDecimals) => {
			tokenDecimalsWrapper.empty();
			tokenDecimalsWrapper.append(tokenDecimals);
		});
		
		DPlayCoinContract.totalSupply((totalSupply) => {
			totalSupplyWrapper.empty();
			totalSupplyWrapper.append(DPlayCoinContract.getDisplayPrice(totalSupply));
		});
		
		SmartContract.getWalletAddress((walletAddress) => {
			
			DPlayCoinContract.balanceOf(walletAddress, (balance) => {
				balanceWrapper.empty();
				balanceWrapper.append(DPlayCoinContract.getDisplayPrice(balance));
			});
		});
		
		DCFaucet.Layout.setContent(content);
		
		inner.on('close', () => {
			content.remove();
		});
	}
});