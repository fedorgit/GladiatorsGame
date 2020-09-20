
window.addEventListener('load', () => {
	init();
});

function init() {

	DataManager.init();

	ViewService.init();

	ModelService.loaderModels((status) => {
		isLoadImage = status; 
		onLoadСomplet();
	});

	let model = {
		login: 'player'
	}

	const data = JSON.stringify(model);

	fetch('/api/get/user', {
		method: 'POST',
		body: data
	})
	.then((response) => response.json())
	.then((user) => {

		let currentUser = new CurrentUser(user.id, user.login, user.name, user.icon);

		DataManager.setCurrentUser(currentUser);
	})
	.catch((error) => console.log(`Error get user data: ${error.message}`))

}

function onLoadСomplet() {

	// TODO: to Terminal
	if(isLoadImage)
		isLoad = true;
}

document.oncontextmenu = function(e){return false};
document.ondrag = function(e){return false};
document.ondragdrop = function(e){return false};
document.ondragstart = function(e){return false};
