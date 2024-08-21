//global variables
var cookieClickerInterval;
var buildingPurchaseInterval;
var checkPrestigeInterval;
var havePrestiged = false;

function buyPrestigeUpgrade(){

}

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

	//check for prestige & buy available prestige upgrades
	var checkPrestigeInterval = setInterval(function(){
		if(!Game.prestige && Game.ascendMeterLevel >= 5){
			Game.Ascend(1)
			buyPrestigeUpgrade()
		}
	}, 1000*60*60);
	
}
function stopAll(){
	clearInterval(cookieClickerInterval);
	clearInterval(buildingPurchaseInterval);
	clearInterval(checkPrestigeInterval);
	console.log("Stopping Automatic Gameplay");
}

automateCookieClicker()