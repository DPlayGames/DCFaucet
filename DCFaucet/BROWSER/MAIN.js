DCFaucet.MAIN = METHOD({

	run : () => {
		
		let refresh = () => {
			REFRESH();
		};
		
		// 네트워크나 계정이 변경되면 새로고침합니다.
		DPlayInventory.addChangeNetworkHandler(refresh);
		DPlayInventory.addChangeAccountHandler(refresh);
		
		DCFaucet.MATCH_VIEW({
			uri : '',
			target : DCFaucet.Home
		});
	}
});
