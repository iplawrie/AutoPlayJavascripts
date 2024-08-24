//global variables
var cookieClickerInterval;
var buildingPurchaseInterval;
var checkPrestigeInterval;
var havePrestiged = false;
var maxPrestige = 100000
var minHeavenlyCookies = 0

function buyPrestigeUpgrade(){
	var availableprestigeupgrades = Game.PrestigeUpgrades.filter(upgrade => upgrade.canBePurchased && !upgrade.bought);
	var sortedupgrades = availableprestigeupgrades.sort(prestigeCompare);
	for (let upgrade in sortedupgrades) {
		if(!upgrade.buy()){
			minAscend = upgrade.basePrice + sortedupgrades[sortedupgrades.indexOf(upgrade)+1].basePrice;
			break;
		}
	}
	Game.Reincarnate(true)
}
function prestigeCompare(a,b){
	if(a.basePrice < b.basePrice){return -1;}
    if(a.basePrice > b.basePrice){return 1;}
    return 0
}

function automateCookieClicker(){

	//find where prestige left off at
	if(Game.prestige){
		var availableprestigeupgrades = Game.PrestigeUpgrades.filter(upgrade => upgrade.canBePurchased && !upgrade.bought);
		var sortedupgrades = availableprestigeupgrades.sort(prestigeCompare);
		minHeavenlyCookies = sortedupgrades[0].basePrice + sortedupgrades[1].basePrice;
	}
	//clicks big cookie 5ms
	cookieClickerInterval = setInterval(Game.ClickCookie, 5);
	
	//buy all upgrades then buildings
	buildingPurchaseInterval = setInterval(function() {
		//buy upgrades
		if(Game.UpgradesInStore.length > 0){
			var upgrade =  Game.UpgradesInStore[0];
			if(upgrade.canBuy()){
				upgrade.buy();
				console.log("Bought " + upgrade.name + " upgrade at " + upgrade.getPrice());
			}
		}
		//buy buildings
		var buildings = Game.ObjectsById;
		var affordableBuildings = buildings.filter(building => building.price <= Game.cookies);
		if (affordableBuildings.length > 0){
			var buybuilding = affordableBuildings[affordableBuildings.length-1]
			var buybuildingprice = buybuilding.price
			buybuilding.buy();
			console.log("Bought " + buybuilding.name + " building at " + buybuildingprice);
		}
	}, 1000);

	//check for prestige & buy available prestige upgrades
	var checkPrestigeInterval = setInterval(function(){
		if(!Game.prestige && Game.ascendMeterLevel >= 5){
			Game.Ascend(true);
			buyPrestigeUpgrade();
		}else if(Game.ascendMeterLevel >= maxPrestige || Game.heavenlyChips >= minHeavenlyCookies){
			Game.Ascend(true);
			buyPrestigeUpgrade();
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