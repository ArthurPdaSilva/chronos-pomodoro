self.onmessage = (event) => {
	console.log("Time Worker received message:", event.data);

	self.postMessage(`Echo: ${event.data}`);
};
