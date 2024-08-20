//global variables
var cookieClickerInterval;
var buildingPurchaseInterval;
var upgradePurchaseInterval;

function automateCookieClicker(){
	//clicks big cookie 5ms
	cookieClickerInterval = setInterval(Game.ClickCookie, 5);
	
	//buy a building
	buildingPurchaseInterval = setInterval(function() {
		var buildings = Game.ObjectsById;
		var affordableBuildings = buildings.filter(building => building.price <= Game.cookies);
		if (affordableBuildings.length > 0){
			affordableBuildings[0].buy();
		}
	}, 1000);
	
	//buy upgrades
	upgradePurchaseInterval = setInterval(function(){
		var upgrades = Game.UpgradesInStore
		var affordableUpgrades = upgrades.filter(upgrades => upgrades.basePrice <= Game.cookies);
		})
}
function stopClick(){
	clearInterval(cookieClickerInterval);
	clearInterval(buildingPurchaseInterval);
	console.log("Stopping click")
}

automateCookieClicker();