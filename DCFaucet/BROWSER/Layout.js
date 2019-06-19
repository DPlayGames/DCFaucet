DCFaucet.Layout = OBJECT({
	
	init : (inner, self) => {
		
		let contentWrapper;
		
		DIV({
			c : [
			// 내용
			contentWrapper = DIV()
			]
		}).appendTo(BODY);
		
		// 내용을 등록합니다.
		let setContent = self.setContent = (content) => {
			//REQUIRED: content
			
			contentWrapper.append(content);
		};
		
		// 내용을 삭제합니다.
		let removeContent = self.removeContent = () => {
			contentWrapper.empty();
		};
	}
});