//global variables
var cookieClickerInterval;
var buildingPurchaseInterval;

function automateCookieClicker(){
	//clicks big cookie 5ms
	cookieClickerInterval = setInterval(Game.ClickCookie, 5);
	
	//buy all upgrades then buildings
	buildingPurchaseInterval = setInterval(function() {
		//buy upgrades
		if(Game.UpgradesInStore.length > 0){
			var upgrade =  Game.UpgradesInStore[0];
			if(upgrade.canBuy){
				upgrade.buy();
			}
		}
		//buy buildings
		var buildings = Game.ObjectsById;
		var affordableBuildings = buildings.filter(building => building.price <= Game.cookies);
		if (affordableBuildings.length > 0){
			affordableBuildings[0].buy();
		}
	}, 1000);
	
}
function stopAll(){
	clearInterval(cookieClickerInterval);
	clearInterval(buildingPurchaseInterval);
	console.log("Stopping click");
}

automateCookieClicker()