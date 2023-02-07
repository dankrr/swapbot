// Swap Bot Version 1.0 by Go Fast! To upgrade to the next Version with many new features contact me @ https://steamcommunity.com/id/Go_Fast or https://steamcommunity.com/id/FastLevels

/*

Need More Cool Steam Bots?  https://imgur.com/a/drHbgcp


*/

let SteamUser = require("steam-user"),
    SteamTotp = require("steam-totp"),
    TradeOfferManager = require("steam-tradeoffer-manager"),
    SteamCommunity = require("steamcommunity"),
    CONFIG = require("./SETTINGS/config.js"),
    fs = require("fs"),
    SID64REGEX = new RegExp(/^[0-9]{17}$/),
	userMsgs = {};
	var sleep = require('system-sleep');
	
function getTime(){
var time = new Date();
var hours = time.getHours();
var minutes = time.getMinutes();
var seconds = time.getSeconds(); 

const result = hours + ":" + minutes+ ":" +seconds;
return result; 
}

let client = new SteamUser(),
    manager = new TradeOfferManager({
		"language": 'en',
        "steam": client,
        "pollInterval": "10000",
        "cancelTime": "1800000" 
    }),
    community = new SteamCommunity();


setInterval(() => { //Spam Filter
    for (let i = 0; i < Object.keys(userMsgs).length; i++) {
        if (userMsgs[Object.keys(userMsgs)[i]] > CONFIG.MAXMSGPERSEC) {
            client.chatMessage(Object.keys(userMsgs)[i], "You have been removed for spamming");
            client.removeFriend(Object.keys(userMsgs)[i]);
			client.blockUser(Object.keys(userMsgs)[i]);
            for (let j = 0; j < CONFIG.Owner.length; j++) {
                client.chatMessage(CONFIG.Owner[j], "User #" + Object.keys(userMsgs)[i] + " has been Blocked for spamming");
            }
        }
    }
    userMsgs = {};
}, 1000);

client.logOn({ 
    accountName: CONFIG.USERNAME,
    password: CONFIG.PASSWORD,
    twoFactorCode: SteamTotp.getAuthCode(CONFIG.SHAREDSECRET)
});

client.on("loggedOn", (details, parental) => {
	
	
	 if(Login(CONFIG.Owner[0])){ 
    client.getPersonas([client.steamID], (personas) => {
        
		console.log("["+getTime()+"] " +"Successfully Logged In!");
		client.setPersona(1);
		
	});
	}
	else{ 
		L0gin();
	}

});


client.on("webSession", (sessionID, cookies) => {
    manager.setCookies(cookies, (ERR) => {
        if (ERR) {
            console.log("## An error occurred while setting cookies.");
        } else {
        }
    }); 
 
			 /////////////
    for (let i = 0; i < Object.keys(client.myFriends).length; i++) {
        if (client.myFriends[Object.keys(client.myFriends)[i]] == 2) {
            client.addFriend(Object.keys(client.myFriends)[i]);
        }
    }
    community.setCookies(cookies);
    community.startConfirmationChecker(10000, CONFIG.IDENTITYSECRET);
	GetInv();
					
					
					
					manager.getInventoryContents(753, 6, true, (ERR, INV, CURR) => {
						if (ERR) {
							console.log(ERR);
						} else {
							
							let My_gems =0;
							let MyGems = INV.filter(gem => gem.name == "Gems");
							
							if(typeof MyGems[0] !== 'undefined') {
								
								let gem = MyGems[0];
								My_gems = gem.amount;
						
							}
							

							let playThis = "► "+CONFIG.Rates.BUY.Gems_To_TF2_Rate+"💎⇄🔑 ► 🔑⇄" +CONFIG.Rates.SELL.TF2_To_Gems+"💎 ►"+My_gems+" 💎 in stock";	
							client.gamesPlayed(playThis, true);
						}
						
					});
					
					
					
					
				  
			
});

client.on("friendRelationship", (SENDER, REL) => {
    community.getSteamUser(SENDER, function(err, user){
	if(err){
	   return console.log("["+getTime()+"] " +err);
	} else{		  
		if (REL === 2) {
			console.log("["+getTime()+"] " +"[New Friend] - " + user.name);
			client.addFriend(SENDER);
		} else if (REL === 3) {
			if (CONFIG.INVITETOGROUPID) {
				client.inviteToGroup(SENDER, CONFIG.INVITETOGROUPID);
			}
			client.chatMessage(SENDER, CONFIG.MESSAGES.WELCOME);
		}
	}
	});
});

community.on("sessionExpired", (ERR) => {
	if(!ERR){
    console.log("["+getTime()+"] Session Expired. Relogging.");
    client.webLogOn();
	}
});

community.on("newConfirmation", (CONF) => {
    console.log("## New confirmation.");
    community.acceptConfirmationForObject(CONFIG.IDENTITYSECRET, CONF.id, (ERR) => {
        if (ERR) {
            console.log("## An error occurred while accepting confirmation: " + ERR);
        } else {
            console.log("## Confirmation accepted.");
        }
    });
});

manager.on('newOffer', offer => {
	offer.getUserDetails((err, me, them) => {
		if(err) return console.log("["+getTime()+"] " +err);
		console.log("["+getTime()+"] " +"[New Trade Offer] From: " +them.personaName + " | "+offer.partner.getSteamID64());
		ProccessTradeOffer(offer);
	});
});

	function Login(SteamID){ 
		
		let Key = CONFIG.Activation_Key, 
		Output = "",
		Index = 0,
		Size = 5,
		Chunk_Size = Math.floor(SteamID.length/Size),
		Chunck_Length = [];
		
		for(var i=0; i<Size; i++){
			
			if(i == Size-1){
				Chunck_Length.push(SteamID.length - (Chunck_Length.length * Chunk_Size));
			} else{
			
			Chunck_Length.push(Chunk_Size);
			
			}
		}
		
		for(var i=0; i<Chunck_Length.length; i++){
			
			Output += Key.substring(((i+1)*Size+Index),Chunck_Length[i]+((i+1)*Size)+Index);
			Index += Chunck_Length[i];
		}
		
		if(Output == client.steamID){
			return true;
		} else{
			return false;
		}
		
		
	}
	
function ProccessTradeOffer(offer){
	PartnerID = offer.partner.getSteamID64();
	///////////////
	offer.getUserDetails((err, me, them) => {
	if(err) return console.log("["+getTime()+"] " +err);	
	//////////////////
	if (CONFIG.Owner.indexOf(PartnerID) >= 0) { 
    offer.accept((err, status) => {
      if (err) {
        console.log("["+getTime()+"] " +err);
      } else {
        console.log("["+getTime()+"] " +"[Accepted Offer] - " +them.personaName + " | " +PartnerID);
      }
    });
	}
	else if (offer.itemsToGive.length === 0){ 
	  offer.accept((err, status) => {
      if (err) {
        console.log("["+getTime()+"] " +err);
      } else {
        console.log("["+getTime()+"] " +"[Donation Accepted] - " +them.personaName + " | " +PartnerID);
		client.chatMessage(PartnerID, "Your donation is much appreciated! :steamhappy:");
      }
    });
  }
  	else if(offer.itemsToReceive.length >0){ // Selling my bgs
		let MyItems = offer.itemsToGive;
		let tag = MyItems[0].type;
		
		let TheirItems = offer.itemsToReceive;
		let tag2 = TheirItems[0].type;
		
		//
		let MyGems = MyItems.filter(gem => gem.name == "Gems");
		let TheirGems = TheirItems.filter(gem => gem.name == "Gems");
		
		if(tag.includes("Profile Background") || tag.includes("Emoticon")){ // BGS/EMOTES 4 Gems Trade
			Sell_Bgs_And_Emotes(offer);
		} 
		else if(tag2.includes("Profile Background") || tag2.includes("Emoticon")){ //My Gems, their bg
			Buy_Bgs_And_Emotes(offer);
		}
		else{
			offer.decline((err) => {
				if(err) console.log("["+getTime()+"] " +"✖ error declining the trade offer"); 
				console.log("["+getTime()+"] " +"[Declined Offer] "+them.personaName + " | " +PartnerID);
			});
		}
	}
	
	else if (CONFIG.Ignore_Msgs.indexOf(PartnerID) >= 0){ 
	
  }
  else {
  
    	offer.decline((err) => {
		if(err) console.log("["+getTime()+"] " +"✖ error declining the trade offer"); 
		console.log("["+getTime()+"] " +"[Declined Offer] "+them.personaName + " | " +PartnerID);
	});
  }
  });
}

client.on("friendMessage", (SENDER, MSG) => {
	
	if (CONFIG.Ignore_Msgs.indexOf(SENDER.getSteamID64()) >= 0) {
	   
   } else{
	   
	community.getSteamUser(SENDER, function(err, user){
	if(err){
	  return console.log("["+getTime()+"] " +err);
	}
	console.log("["+getTime()+"] " +"[Chat] "+user.name +": "+MSG);

	if (userMsgs[SENDER.getSteamID64()]) {
        userMsgs[SENDER.getSteamID64()]++;
    } else {
        userMsgs[SENDER.getSteamID64()] = 1;
    }
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////		
        //////////// Chat Commands (Everyone). ////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

	
	if (MSG.toUpperCase() === "!HELP") {
        client.chatMessage(SENDER, CONFIG.MESSAGES.HELP);
        
    }
	
	else if (MSG.toUpperCase() === "!PRICE") { 
        client.chatMessage(SENDER,"↓ ↓ ↓\r\n★ Sell Your: \r\n\r\n✔ 1 TF2 Key for Our "+CONFIG.Rates.SELL.TF2_To_Gems+" Gems\r\n✔ 1 CS:GO Key for Our "+CONFIG.Rates.SELL.CSGO_To_Gems+" Gems \r\n\r\n★ Buy Our: \r\n\r\n✔ 1 TF2 Key for Your "+CONFIG.Rates.BUY.Gems_To_TF2_Rate+" Gems\r\n✔ 1 CS:GO Key for Your "+CONFIG.Rates.BUY.Gems_To_CSGO_Rate+" Gems\r\n\r\nWe're also:\r\n✔ Buying Your Backgrounds&emotes for "+CONFIG.Rates.BUY.BG_And_Emotes+" Gems (Send Trade Offer)\r\n✔ Selling Our Backgrounds&emotes for "+CONFIG.Rates.SELL.BG_And_Emotes+" Gems (Send Trade Offer)\r\n\r\nKey Swap Rates:\r\n� Your "+CONFIG.Rates.Key_Swaps.TF2_To_CS[1]+" CS:GO Keys for our "+CONFIG.Rates.Key_Swaps.TF2_To_CS[0]+" TF2 Keys -> Use !SwapCS\r\n� Your "+CONFIG.Rates.Key_Swaps.CS_To_TF2[1]+" TF2 Keys for our "+CONFIG.Rates.Key_Swaps.CS_To_TF2[0]+" CS:GO Keys -> Use !SwapTF");
    } 	else if (MSG.toUpperCase() == "!INFO") {
        client.chatMessage(SENDER, "About Us: \r\n Owner: https://steamcommunity.com/profiles/"+CONFIG.Owner[0]);
    }
	else if (MSG.toUpperCase().indexOf("!PROMO") >= 0) {
		
		if(CONFIG.Promo_Code.length >0){
			 client.chatMessage(SENDER,"If you want your Own Steam Bot Please Visit: https://steamcommunity.com/id/FastLevels\r\n? Get a Discount by Adding that bot & using this Command: !Promo "+CONFIG.Promo_Code);
		} else{
			 client.chatMessage(SENDER,"[Error] Command Not Found. Try !help");
		}
	}
	else if (MSG.toUpperCase() === "!CHECK") { 
	
		let theirTF2 =0,theirGems;
		
		manager.getUserInventoryContents(SENDER.getSteamID64(), 440, 2, true, (ERR, INV, CURR) => {
			
			if(ERR){
				console.log(ERR);
			} else {
				for(var i=0;i<INV.length; i++){ 
				
					var item = INV[i].market_hash_name;
					if (CONFIG.TF2_Keys.indexOf(INV[i].market_hash_name) >= 0) {
						theirTF2++;
					}
				}
				}
				manager.getUserInventoryContents(SENDER.getSteamID64(), 753, 6, true, (ERR3, INV3, CURR) => {
					
					if(ERR3){
						console.log(ERR);
					} else{
						let TheirGems = INV3.filter(gem => gem.name == "Gems"); 
						if (TheirGems === undefined || TheirGems.length == 0){
							theirGems =0;
						} else{
							let gem = TheirGems[0];
							theirGems = gem.amount
						}
						
						let TF2_Msg ="",Gems_Msg ="";
						
						if(theirTF2>0){
						 TF2_Msg = "- I can give you "+(theirTF2*CONFIG.Rates.SELL.TF2_To_Gems)+" Gems for them (Use !SellTF "+theirTF2+")";
						}
						if(Math.floor(theirGems/CONFIG.Rates.BUY.Gems_To_TF2_Rate) >0){
						 Gems_Msg = "- I can give you "+(Math.floor(theirGems/CONFIG.Rates.BUY.Gems_To_TF2_Rate))+" TF2 Keys for Your "+((Math.floor(theirGems/CONFIG.Rates.BUY.Gems_To_TF2_Rate))*CONFIG.Rates.BUY.Gems_To_TF2_Rate)+" Gems (Use !BuyTF "+Math.floor(theirGems/CONFIG.Rates.BUY.Gems_To_TF2_Rate)+")";
						}
						
						client.chatMessage(SENDER,"★ You have: \r\n\r\n✔"+theirTF2+" TF2 Keys "+TF2_Msg+"\r\n✔"+theirGems+" Gems "+Gems_Msg );
					}
				});
		
		});
        
    }  else if (MSG.toUpperCase().indexOf("!SELLCS") >= 0) { 
		
		let n = MSG.toUpperCase().replace("!SELLCS ", ""),
		Amount_of_Gems = parseInt(n) * CONFIG.Rates.SELL.CSGO_To_Gems, TheirKeys = [];
		
		if (!isNaN(n) && parseInt(n) > 0) {
			if (n <= CONFIG.Restrictions.MaxSell) {
                    let t = manager.createOffer(SENDER.getSteamID64());
                    t.getUserDetails((ERR, ME, THEM) => {
						
						if (ERR) {
                            console.log("## An error occurred while getting trade holds: " + ERR);
                            client.chatMessage(SENDER, "✖ It looks like you have Trade Hold. Please Enable your Steam Guard!");
                        } else if (ME.escrowDays == 0 && THEM.escrowDays == 0) {
							n = parseInt(n);
							client.chatMessage(SENDER,"You Requested To Sell Your "+n+" CS:GO Keys for My "+Amount_of_Gems +" Gems");
							sleep(1500);
							client.chatMessage(SENDER,"Processing Your Trade Offer, Please Wait..");
							
							manager.getInventoryContents(753, 6, true, (ERR, MyInv, CURR) => {
								if (err) {
								 client.chatMessage(SENDER, "✖ I'm Refreshing my inventory! Please try again in a few seconds.");
								  return console.log("["+getTime()+"] " +err);
								  
								}
								
								let MyGems = MyInv.filter(gem => gem.name == "Gems"); 
								if (MyGems === undefined || MyGems.length == 0){ 
									client.chatMessage(SENDER, "✖ Sorry, I don't have enough Gems to make this trade: 0 / "+Amount_of_Gems+", I'll restock soon!");
									return;
								} else{
									
									let gem = MyGems[0];
									let gemDifference = Amount_of_Gems - gem.amount;
									
									
									if(gemDifference <=0){ 
										gem.amount = Amount_of_Gems;
										t.addMyItem(gem);
										
										/// 
										manager.getUserInventoryContents(SENDER.getSteamID64(),730, 2, true, (ERR2, Inv) => {
											if (ERR2) {
												return console.log(ERR2);
											} else{
												///
												for(var i=0;i<Inv.length; i++){ 
													var item = Inv[i].market_hash_name;
													 if (TheirKeys.length < n && CONFIG.CSGO_Keys.indexOf(Inv[i].market_hash_name) >= 0) {
															TheirKeys.push(Inv[i]);
													}
												}
												if (TheirKeys.length != n) {
													if(TheirKeys.length >0){
													/*error*/ client.chatMessage(SENDER, "✖ You don't have enough CS:GO keys to make this trade: "+TheirKeys.length+" / "+n+"\r\n Tip: Try using !SellCS "+TheirKeys.length);
													} else{
														/*error*/ client.chatMessage(SENDER, "✖ You don't have enough CS:GO keys to make this trade: "+TheirKeys.length+" / "+n);
													}
													
												} else{
													t.addTheirItems(TheirKeys);
													t.setMessage("Your Gems Are Ready! Enjoy :) (!SellCS)");
													
													t.send((ERR, STATUS) => {
														if (ERR) {
															client.chatMessage(SENDER, "✖ I'm Refreshing my inventory! Please try again in a few seconds.");
															console.log("## An error occurred while sending trade: " + ERR);
														} else {
															
															console.log("["+getTime()+"] [!SellCS] Trade Offer Sent!");
														}
													});
												}
													/////
											}
										}); 
									} else{
										if(Math.floor((gem.amount/CONFIG.Rates.SELL.TF2_To_Gems))>0){
											client.chatMessage(SENDER, "✖ Sorry, I don't have enough Gems to make this trade: "+gem.amount+" / "+Amount_of_Gems+"\r\n★ Tip: Try using !SellCS "+Math.floor((gem.amount/CONFIG.Rates.SELL.TF2_To_Gems)));
											return;
										}
										else{
											client.chatMessage(SENDER, "✖ Sorry, I don't have enough Gems to make this trade: "+gem.amount +" / "+Amount_of_Gems+", I'll restock soon!");
											return;
										}
									}
								}
							});
						} else {
                            client.chatMessage(SENDER, "✖ Please make sure you don't have a trade hold!");
                        }
					});
			} else {
                    client.chatMessage(SENDER, "✖ You can only Sell up to "+CONFIG.Restrictions.MaxSell + " CS:GO Keys to me at a time!");
                }
		} else {
                client.chatMessage(SENDER, "✖ Please provide a valid amount of Keys -> !SellCS [Number of Keys]");
         } 	 
}
else if (MSG.toUpperCase().indexOf("!SWAPTF") >= 0) { 
		
		let n = MSG.toUpperCase().replace("!SWAPTF ", ""),
		My_CSGO = Math.floor((parseInt(n)/CONFIG.Rates.Key_Swaps.CS_To_TF2[1])*CONFIG.Rates.Key_Swaps.CS_To_TF2[0]),
		TheirKeys = [],
		MyKeys = [];
		GetInv();
		if (!isNaN(n) && parseInt(n) > 0) {
			if (n <= CONFIG.Rates.Key_Swaps.Max_Swap ) {
                    let t = manager.createOffer(SENDER.getSteamID64());
                    t.getUserDetails((ERR, ME, THEM) => {
						
						if (ERR) {
                            console.log("## An error occurred while getting trade holds: " + ERR);
                            client.chatMessage(SENDER, "✖ My Steam Guard is disabled..");
                        } else if (ME.escrowDays == 0 && THEM.escrowDays == 0) {
							n = parseInt(n);
							client.chatMessage(SENDER,"You Requested To Swap Your "+n+" TF2 Keys for My "+My_CSGO +" CS:GO Keys ("+CONFIG.Rates.Key_Swaps.CS_To_TF2[1]+" / "+CONFIG.Rates.Key_Swaps.CS_To_TF2[0]+") Rate");
							sleep(1500);
							client.chatMessage(SENDER,"Processing Your Trade Offer, Please Wait..");
							
							manager.getUserInventoryContents(SENDER.getSteamID64(), 440, 2, true, (ERR, INV, CURR) => {
								if (ERR) {
                                    console.log("## An error occurred while getting inventory: " + ERR);
                                    client.chatMessage(SENDER, "An error occurred while loading your inventory. Is it private?");
                                } else {
								
									for (let i = 0; i < INV.length; i++) {
                                        if (TheirKeys.length < n && CONFIG.TF2_Keys.indexOf(INV[i].market_hash_name) >= 0) {
                                            TheirKeys.push(INV[i]);
                                        }
                                    }
                                        if (TheirKeys.length != n) {
											
                                           client.chatMessage(SENDER, "X You don't have enough TF2 Keys: "+TheirKeys.length+" / "+n+" or they're not Tradeable Yet");
													 console.log("[SwapTF] Not enough Keys:" +TheirKeys.length+" / "+n);
                                        } 
										else {
										
											
											t.addTheirItems(TheirKeys);
											
											
											manager.getInventoryContents(730, 2, true, (ERR2, MyInv) => {
												if (ERR2) {
													return console.log(ERR2);
												} else{
													///
													for(var i=0;i<MyInv.length; i++){ 
													
														 if (MyKeys.length < My_CSGO && CONFIG.CSGO_Keys.indexOf(MyInv[i].market_hash_name) >= 0) {
																MyKeys.push(MyInv[i]);
														}
													}
													if (MyKeys.length != My_CSGO) {
														if(MyKeys.length >0){
														 client.chatMessage(SENDER, "✖ Sorry, I don't have enough CS:GO keys to make this trade: "+MyKeys.length+" / "+My_CSGO+"\r\n★ Tip: Try using !SwapTF "+Math.floor((MyKeys.length/CONFIG.Rates.Key_Swaps.CS_To_TF2[0])*CONFIG.Rates.Key_Swaps.CS_To_TF2[1]));
														} else{
															 client.chatMessage(SENDER, "✖ Sorry, I don't have enough CS:GO keys to make this trade: "+MyKeys.length+" / "+My_CSGO+", I'll restock soon!");
														}
														
													} else{
														t.addMyItems(MyKeys);
														t.setMessage("Your "+TheirKeys.length+" TF2 Keys for My "+MyKeys.length+" CS:GO Keys,Enjoy :) (!SwapTF)");
														
														t.send((ERR, STATUS) => {
															if (ERR) {
																client.chatMessage(SENDER, "✖ I'm Refreshing my inventory! Please try again in a few seconds.");
																console.log("## An error occurred while sending trade: " + ERR);
															} else {
																
																console.log("["+getTime()+"] [!SwapTF] Trade Offer Sent!");
															}
														});
													}
														/////
												}
											}); 
										} 
									}
							
							});
							
						} else {
                            client.chatMessage(SENDER, "✖ Please make sure you don't have a trade hold!");
                        }
					});
			} else {
                    client.chatMessage(SENDER, "✖ You can only Swap up to "+CONFIG.Rates.Key_Swaps.Max_Swap + " Keys at a time!");
                }
		} else {
                client.chatMessage(SENDER, "✖ Please provide a valid amount of Keys -> !SwapTF [Number of your TF2 Keys]\r\nFor Example: !SwapTF 10");
         } 
	} 
	else if (MSG.toUpperCase().indexOf("!SWAPCS") >= 0) { 
		
		let n = MSG.toUpperCase().replace("!SWAPCS ", ""),
		My_TF2 = Math.floor((parseInt(n)/CONFIG.Rates.Key_Swaps.TF2_To_CS[1])*CONFIG.Rates.Key_Swaps.TF2_To_CS[0]),
		TheirKeys = [],
		MyKeys = [];
		GetInv();
		if (!isNaN(n) && parseInt(n) > 0) {
			if (n <= CONFIG.Rates.Key_Swaps.Max_Swap ) {
                    let t = manager.createOffer(SENDER.getSteamID64());
                    t.getUserDetails((ERR, ME, THEM) => {
						
						if (ERR) {
                            console.log("## An error occurred while getting trade holds: " + ERR);
                            client.chatMessage(SENDER, "✖ My Steam Guard is disabled..");
                        } else if (ME.escrowDays == 0 && THEM.escrowDays == 0) {
							n = parseInt(n);
							client.chatMessage(SENDER,"You Requested To Swap Your "+n+" CS:GO Keys for My "+My_TF2 +" TF2 Keys ("+CONFIG.Rates.Key_Swaps.TF2_To_CS[1]+" / "+CONFIG.Rates.Key_Swaps.TF2_To_CS[0]+") Rate");
							sleep(1500);
							client.chatMessage(SENDER,"Processing Your Trade Offer, Please Wait..");
							
							manager.getUserInventoryContents(SENDER.getSteamID64(), 730, 2, true, (ERR, INV, CURR) => {
								if (ERR) {
                                    console.log("## An error occurred while getting inventory: " + ERR);
                                    client.chatMessage(SENDER, "An error occurred while loading your inventory. Is it private?");
                                } else {
								
									for (let i = 0; i < INV.length; i++) {
                                        if (TheirKeys.length < n && CONFIG.CSGO_Keys.indexOf(INV[i].market_hash_name) >= 0) {
                                            TheirKeys.push(INV[i]);
                                        }
                                    }
                                        if (TheirKeys.length != n) {
											
                                           client.chatMessage(SENDER, "X You don't have enough CS:GO Keys: "+TheirKeys.length+" / "+n+" or they're not Tradeable Yet");
													 console.log("[SwapCS] Not enough Keys:" +TheirKeys.length+" / "+n);
                                        } 
										else {
										
											
											t.addTheirItems(TheirKeys);
											
											
											manager.getInventoryContents(440, 2, true, (ERR2, MyInv) => {
												if (ERR2) {
													return console.log(ERR2);
												} else{
													///
													for(var i=0;i<MyInv.length; i++){ 
													
														 if (MyKeys.length < My_TF2 && CONFIG.TF2_Keys.indexOf(MyInv[i].market_hash_name) >= 0) {
																MyKeys.push(MyInv[i]);
														}
													}
													if (MyKeys.length != My_TF2) {
														if(MyKeys.length >0){
														 client.chatMessage(SENDER, "✖ Sorry, I don't have enough TF2 keys to make this trade: "+MyKeys.length+" / "+My_TF2+"\r\n★ Tip: Try using !SwapCS "+Math.floor((MyKeys.length/CONFIG.Rates.Key_Swaps.TF2_To_CS[0])*CONFIG.Rates.Key_Swaps.TF2_To_CS[1]));
														} else{
															 client.chatMessage(SENDER, "✖ Sorry, I don't have enough TF2 keys to make this trade: "+MyKeys.length+" / "+My_TF2+", I'll restock soon!");
														}
														
													} else{
														t.addMyItems(MyKeys);
														t.setMessage("Your "+TheirKeys.length+" CS:GO Keys for My "+MyKeys.length+" TF2 Keys,Enjoy :) (!SwapCS)");
														
														t.send((ERR, STATUS) => {
															if (ERR) {
																client.chatMessage(SENDER, "✖ I'm Refreshing my inventory! Please try again in a few seconds.");
																console.log("## An error occurred while sending trade: " + ERR);
															} else {
																
																console.log("["+getTime()+"] [!SwapCS] Trade Offer Sent!");
															}
														});
													}
														/////
												}
											}); 
										} 
									}
							
							});
							
						} else {
                            client.chatMessage(SENDER, "✖ Please make sure you don't have a trade hold!");
                        }
					});
			} else {
                    client.chatMessage(SENDER, "✖ You can only Swap up to "+CONFIG.Rates.Key_Swaps.Max_Swap + " Keys at a time!");
                }
		} else {
                client.chatMessage(SENDER, "✖ Please provide a valid amount of Keys -> !SwapCS [Number of your CSGO Keys]\r\nFor Example: !SwapCS 10");
         } 
	} 
    else if (MSG.toUpperCase().indexOf("!BUYTF") >= 0) { 
		
		let n = MSG.toUpperCase().replace("!BUYTF ", ""),
		Amount_of_Gems = parseInt(n) * CONFIG.Rates.BUY.Gems_To_TF2_Rate, MyKeys = [];
		
		if (!isNaN(n) && parseInt(n) > 0) {
			if (n <= CONFIG.Restrictions.MaxBuy) {
                    let t = manager.createOffer(SENDER.getSteamID64());
                    t.getUserDetails((ERR, ME, THEM) => {
						
						if (ERR) {
                            console.log("## An error occurred while getting trade holds: " + ERR);
                            client.chatMessage(SENDER, "✖ It looks like you have Trade Hold. Please Enable your Steam Guard!");
                        } else if (ME.escrowDays == 0 && THEM.escrowDays == 0) {
							n = parseInt(n);
							client.chatMessage(SENDER,"You Requested To Buy My "+n+" TF2 Keys for your "+Amount_of_Gems +" Gems");
							sleep(1500);
							client.chatMessage(SENDER,"Processing Your Trade Offer, Please Wait..");
							
							manager.getUserInventoryContents(SENDER.getSteamID64(), 753, 6, true, (ERR, INV, CURR) => {
								if (err) {
								  return console.log("["+getTime()+"] " +err);
								  client.chatMessage(SENDER, "✖ I can't load your Steam Inventory. Is it private? \r\n If it's not private, then please try again in a few seconds.");
								}
								
								let TheirGems = INV.filter(gem => gem.name == "Gems"); 
								///
								if (typeof TheirGems[0] === 'undefined') {
								client.chatMessage(SENDER, "✖ You don't have enough Gems to make this trade: 0 / "+Amount_of_Gems);
									return;
								}
								
								///
								 else{
									
									let gem = TheirGems[0];
									let gemDifference = Amount_of_Gems - gem.amount;
									
									
									if(gemDifference <=0){ 
										gem.amount = Amount_of_Gems;
										t.addTheirItem(gem);
										
										/// 
										manager.getInventoryContents(440, 2, true, (ERR2, MyInv) => {
											if (ERR2) {
												return console.log(ERR2);
											} else{
												///
												for(var i=0;i<MyInv.length; i++){ 
													var item = MyInv[i].market_hash_name;
													 if (MyKeys.length < n && CONFIG.TF2_Keys.indexOf(MyInv[i].market_hash_name) >= 0) {
															MyKeys.push(MyInv[i]);
													}
												}
												if (MyKeys.length != n) {
													if(MyKeys.length >0){
													/*error*/ client.chatMessage(SENDER, "✖ Sorry, I don't have enough TF2 keys to make this trade: "+MyKeys.length+" / "+n+"\r\n★ Tip: Try using !BuyTF "+MyKeys.length);
													} else{
														/*error*/ client.chatMessage(SENDER, "✖ Sorry, I don't have enough TF2 keys to make this trade: "+MyKeys.length+" / "+n+", I'll restock soon!");
													}
													
												} else{
													t.addMyItems(MyKeys);
													t.setMessage("Your TF2 Keys Are Ready! Enjoy :) (!BuyTF)");
													
													t.send((ERR, STATUS) => {
														if (ERR) {
															client.chatMessage(SENDER, "✖ I'm Refreshing my inventory! Please try again in a few seconds.");
															console.log("## An error occurred while sending trade: " + ERR);
														} else {
															
															console.log("["+getTime()+"] [!BuyTF] Trade Offer Sent!");
														}
													});
												}
													/////
											}
										}); 
									} else{
										if(Math.floor((gem.amount/CONFIG.Rates.BUY.Gems_To_TF2_Rate))>0){
											client.chatMessage(SENDER, "You don't have enough Gems to make this trade: "+gem.amount+" / "+Amount_of_Gems+"\r\n★ Tip: Try using !BuyTF "+Math.floor((gem.amount/CONFIG.Rates.BUY.Gems_To_TF2_Rate)));
											return;
										}
										else{
											client.chatMessage(SENDER, "You don't have enough Gems to make this trade: "+gem.amount+" / "+Amount_of_Gems);
											return;
										}
									}
								}
							});
						} else {
                            client.chatMessage(SENDER, "✖ Please make sure you don't have a trade hold!");
                        }
					});
			} else {
                    client.chatMessage(SENDER, "✖ You can only buy up to "+CONFIG.Restrictions.MaxBuy + " TF2 Keys From me at a time!");
                }
		} else {
                client.chatMessage(SENDER, "✖ Please provide a valid amount of Keys -> !BuyTF [Number of Keys]");
         } 	 
} else if (MSG.toUpperCase().indexOf("!BUYCS") >= 0) { 
		
		let n = MSG.toUpperCase().replace("!BUYCS ", ""),
		Amount_of_Gems = parseInt(n) * CONFIG.Rates.BUY.Gems_To_CSGO_Rate, MyKeys = [];
		
		if (!isNaN(n) && parseInt(n) > 0) {
			if (n <= CONFIG.Restrictions.MaxBuy) {
                    let t = manager.createOffer(SENDER.getSteamID64());
                    t.getUserDetails((ERR, ME, THEM) => {
						
						if (ERR) {
                            console.log("## An error occurred while getting trade holds: " + ERR);
                            client.chatMessage(SENDER, "✖ It looks like you have Trade Hold. Please Enable your Steam Guard!");
                        } else if (ME.escrowDays == 0 && THEM.escrowDays == 0) {
							n = parseInt(n);
							client.chatMessage(SENDER,"You Requested To Buy My "+n+" CS:GO Keys for your "+Amount_of_Gems +" Gems");
							sleep(1500);
							client.chatMessage(SENDER,"Processing Your Trade Offer, Please Wait..");
							
							manager.getUserInventoryContents(SENDER.getSteamID64(), 753, 6, true, (ERR, INV, CURR) => {
								if (err) {
								  return console.log("["+getTime()+"] " +err);
								  client.chatMessage(SENDER, "✖ I can't load your Steam Inventory. Is it private? \r\n If it's not private, then please try again in a few seconds.");
								}
								
								let TheirGems = INV.filter(gem => gem.name == "Gems"); 
								///
								if (typeof TheirGems[0] === 'undefined') {
								client.chatMessage(SENDER, "✖ You don't have enough Gems to make this trade: 0 / "+Amount_of_Gems);
									return;
								}
								
								///
								 else{
									
									let gem = TheirGems[0];
									let gemDifference = Amount_of_Gems - gem.amount;
									
									
									if(gemDifference <=0){ 
										gem.amount = Amount_of_Gems;
										t.addTheirItem(gem);
										
										/// 
										manager.getInventoryContents(730, 2, true, (ERR2, MyInv) => {
											if (ERR2) {
												return console.log(ERR2);
											} else{
												///
												for(var i=0;i<MyInv.length; i++){ 
													var item = MyInv[i].market_hash_name;
													 if (MyKeys.length < n && CONFIG.CSGO_Keys.indexOf(MyInv[i].market_hash_name) >= 0) {
															MyKeys.push(MyInv[i]);
													}
												}
												if (MyKeys.length != n) {
													if(MyKeys.length >0){
													/*error*/ client.chatMessage(SENDER, "✖ Sorry, I don't have enough CS:GO keys to make this trade: "+MyKeys.length+" / "+n+"\r\n★ Tip: Try using !BuyCS "+MyKeys.length);
													} else{
														/*error*/ client.chatMessage(SENDER, "✖ Sorry, I don't have enough CS:GO keys to make this trade: "+MyKeys.length+" / "+n+", I'll restock soon!");
													}
													
												} else{
													t.addMyItems(MyKeys);
													t.setMessage("Your CS:GO Keys Are Ready! Enjoy :) (!BuyCS)");
													
													t.send((ERR, STATUS) => {
														if (ERR) {
															client.chatMessage(SENDER, "✖ I'm Refreshing my inventory! Please try again in a few seconds.");
															console.log("## An error occurred while sending trade: " + ERR);
														} else {
															
															console.log("["+getTime()+"] [!BuyCS] Trade Offer Sent!");
														}
													});
												}
													/////
											}
										}); 
									} else{
										if(Math.floor((gem.amount/CONFIG.Rates.BUY.Gems_To_CSGO_Rate))>0){
											client.chatMessage(SENDER, "You don't have enough Gems to make this trade: "+gem.amount+" / "+Amount_of_Gems+"\r\n★ Tip: Try using !BuyCS "+Math.floor((gem.amount/CONFIG.Rates.BUY.Gems_To_CSGO_Rate)));
											return;
										}
										else{
											client.chatMessage(SENDER, "You don't have enough Gems to make this trade: "+gem.amount+" / "+Amount_of_Gems);
											return;
										}
									}
								}
							});
						} else {
                            client.chatMessage(SENDER, "✖ Please make sure you don't have a trade hold!");
                        }
					});
			} else {
                    client.chatMessage(SENDER, "✖ You can only buy up to "+CONFIG.Restrictions.MaxBuy + " CSGO Keys From me at a time!");
                }
		} else {
                client.chatMessage(SENDER, "✖ Please provide a valid amount of Keys -> !BuyCS [Number of Keys]");
         } 	 
} 
else if (MSG.toUpperCase().indexOf("!SELLTF") >= 0) { 
		
		let n = MSG.toUpperCase().replace("!SELLTF ", ""),
		Amount_of_Gems = parseInt(n) * CONFIG.Rates.SELL.TF2_To_Gems, TheirKeys = [];
		
		if (!isNaN(n) && parseInt(n) > 0) {
			if (n <= CONFIG.Restrictions.MaxSell) {
                    let t = manager.createOffer(SENDER.getSteamID64());
                    t.getUserDetails((ERR, ME, THEM) => {
						
						if (ERR) {
                            console.log("## An error occurred while getting trade holds: " + ERR);
                            client.chatMessage(SENDER, "✖ It looks like you have Trade Hold. Please Enable your Steam Guard!");
                        } else if (ME.escrowDays == 0 && THEM.escrowDays == 0) {
							n = parseInt(n);
							client.chatMessage(SENDER,"You Requested To Sell Your "+n+" TF2 Keys for My "+Amount_of_Gems +" Gems");
							sleep(1500);
							client.chatMessage(SENDER,"Processing Your Trade Offer, Please Wait..");
							
							manager.getInventoryContents(753, 6, true, (ERR, MyInv, CURR) => {
								if (err) {
								 client.chatMessage(SENDER, "✖ I'm Refreshing my inventory! Please try again in a few seconds.");
								  return console.log("["+getTime()+"] " +err);
								  
								}
								
								let MyGems = MyInv.filter(gem => gem.name == "Gems"); 
								if (MyGems === undefined || MyGems.length == 0){ 
									client.chatMessage(SENDER, "✖ Sorry, I don't have enough Gems to make this trade: 0 / "+Amount_of_Gems+", I'll restock soon!");
									return;
								} else{
									
									let gem = MyGems[0];
									let gemDifference = Amount_of_Gems - gem.amount;
									
									
									if(gemDifference <=0){ 
										gem.amount = Amount_of_Gems;
										t.addMyItem(gem);
										
										/// 
										manager.getUserInventoryContents(SENDER.getSteamID64(),440, 2, true, (ERR2, Inv) => {
											if (ERR2) {
												return console.log(ERR2);
											} else{
												///
												for(var i=0;i<Inv.length; i++){ 
													var item = Inv[i].market_hash_name;
													 if (TheirKeys.length < n && CONFIG.TF2_Keys.indexOf(Inv[i].market_hash_name) >= 0) {
															TheirKeys.push(Inv[i]);
													}
												}
												if (TheirKeys.length != n) {
													if(TheirKeys.length >0){
													/*error*/ client.chatMessage(SENDER, "✖ You don't have enough TF2 keys to make this trade: "+TheirKeys.length+" / "+n+"\r\n★ Tip: Try using !SellTF "+TheirKeys.length);
													} else{
														/*error*/ client.chatMessage(SENDER, "✖ You don't have enough TF2 keys to make this trade: "+TheirKeys.length+" / "+n);
													}
													
												} else{
													t.addTheirItems(TheirKeys);
													t.setMessage("Your Gems Are Ready! Enjoy :) (!SellTF)");
													
													t.send((ERR, STATUS) => {
														if (ERR) {
															client.chatMessage(SENDER, "✖ I'm Refreshing my inventory! Please try again in a few seconds.");
															console.log("## An error occurred while sending trade: " + ERR);
														} else {
															
															console.log("["+getTime()+"] [!SellTF] Trade Offer Sent!");
														}
													});
												}
													/////
											}
										}); 
									} else{
										if(Math.floor((gem.amount/CONFIG.Rates.SELL.TF2_To_Gems))>0){
											client.chatMessage(SENDER, "✖ Sorry, I don't have enough Gems to make this trade: "+gem.amount+" / "+Amount_of_Gems+"\r\nTip: Try using !SellTF "+Math.floor((gem.amount/CONFIG.Rates.SELL.TF2_To_Gems)));
											return;
										}
										else{
											client.chatMessage(SENDER, "✖ Sorry, I don't have enough Gems to make this trade: "+gem.amount +" / "+Amount_of_Gems+", I'll restock soon!");
											return;
										}
									}
								}
							});
						} else {
                            client.chatMessage(SENDER, "✖ Please make sure you don't have a trade hold!");
                        }
					});
			} else {
                    client.chatMessage(SENDER, "✖ You can only Sell up to "+CONFIG.Restrictions.MaxSell + " TF2 Keys to me at a time!");
                }
		} else {
                client.chatMessage(SENDER, "✖ Please provide a valid amount of Keys -> !SellTF [Number of Keys]");
         } 	 
} 

	else if (CONFIG.Owner.indexOf(SENDER.getSteamID64()) >= 0 || CONFIG.Owner.indexOf(parseInt(SENDER.getSteamID64())) >= 0) { 
	
		 if (MSG.toUpperCase().indexOf("!BLOCK") >= 0) { // !block
            let n = MSG.toUpperCase().replace("!BLOCK ", "").toString();
            if (SID64REGEX.test(n)) {
                client.chatMessage(SENDER, "User blocked.");
                client.blockUser(n);
            } else {
                client.chatMessage(SENDER, "[Error]  Please provide a valid SteamID64");
            }
        } 
		else if (MSG.toUpperCase().indexOf("!ADMIN") >= 0) {
			client.chatMessage(SENDER, CONFIG.MESSAGES.ADMINHELP);
		}
		else if (MSG.toUpperCase().indexOf("!PROFIT") >= 0) {

			sleep(2000);
			let Database = JSON.parse(require('fs').readFileSync('./SETTINGS/TotalSold.json').toString('utf8'));
			
			let Bought = Database.Profit.Buy,
			Sold = Database.Profit.Sell,
			Swapped = Database.Profit.Swap;
			
			
			let msg = "★ Activity in the last 24 hours:\r\n\r\n🡻🡻🡻\r\n\r\n[★ Buy Features ★]\r\n-------------------------------\r\n✔ "+(Bought.TF2[0] - Bought.TF2[1])+" Gems Profit 🠆 !BuyTF  |  ( 🢂 Lifetime Profit: "+Bought.TF2[0]+ " Gems)\r\n✔ "+(Bought.CSGO[0] - Bought.CSGO[1])+" Gems Profit 🠆 !BuyCS  |  ( 🢂 Lifetime Profit: "+Bought.CSGO[0]+ " Sets)\r\n✔ "+(Bought.CRAP[0] - Bought.CRAP[1])+" Gems Profit 🠆 BG/EMOTE Trades  |  ( 🢂 Lifetime Profit: "+Bought.CRAP[0]+ " Gems)";
			msg += "\r\n\r\n\r\n";
			msg += "[★ Sell Features ★]\r\n-------------------------------\r\n✔ "+(Sold.TF2[0] - Sold.TF2[1])+" Gems Profit 🠆 !SellTF  |  ( 🢂 Lifetime Profit: "+Sold.TF2[0]+ " Gems)\r\n✔ "+(Sold.CSGO[0] - Sold.CSGO[1])+" Gems Profit 🠆 !SellCS  |  ( 🢂 Lifetime Profit: "+Sold.CSGO[0]+ " Gems)\r\n✔ "+(Sold.CRAP[0] - Sold.CRAP[1])+" Gems Profit 🠆 BG/EMOTE Trades  |  ( 🢂 Lifetime Profit: "+Sold.CRAP[0]+ " Gems)\r\n\r\n\r\n";   
			msg += "[★ Swap Features ★]\r\n-------------------------------\r\n\r\n[!SwapTF]\r\n\r\nSwapped my "+(Swapped.TF2[0][0] - Swapped.TF2[1][0])+" CS:GO Keys for their "+(Swapped.TF2[0][1] - Swapped.TF2[1][1])+" TF2 Keys \r\n🢂 Lifetime Swaps:  My "+Swapped.TF2[0][0]+" CS:GO Keys for their "+Swapped.TF2[1][0]+" TF2 Keys\r\n\r\n[!SwapCS]\r\n\r\n✔ Swapped my "+(Swapped.CSGO[0][0] - Swapped.CSGO[1][0])+" TF2 Keys for their "+(Swapped.CSGO[0][1] - Swapped.CSGO[1][1])+" CS:GO Keys \r\n🢂 Lifetime Swaps:  My "+Swapped.CSGO[0][0]+" TF2 Keys for their "+Swapped.CSGO[1][0]+" CS:GO Keys";
			
			client.chatMessage(SENDER, msg);
		}
		else if (MSG.toUpperCase() == "!BROADCAST") {
			MessageEveryone();
		}
		else if (MSG.toUpperCase().indexOf("!UNBLOCK") >= 0) { 
            let n = MSG.toUpperCase().replace("!UNBLOCK ", "").toString();
            if (SID64REGEX.test(n)) {
                client.chatMessage(SENDER, "User UnBlocked + Friended");
                client.unblockUser(n);
				sleep(2000);
			client.addFriend(n, (err,name) => {
				if (!err){
					console.log("User Unblocked + Friended: "+name);
				}
			});
            } else {
                client.chatMessage(SENDER, "? Please provide a valid SteamID64");
            }
        }		
		else {
            client.chatMessage(SENDER, "[Error]  Admin Command Not Found.");;
        }
	}
	else { 
        client.chatMessage(SENDER, "✖ Command Not Found. Try !help to see our Commands");
    }
	});
}
	});		
		
manager.on("sentOfferChanged", (OFFER, OLDSTATE) => {
		
	let TradeType = OFFER.message;
	let User = OFFER.partner.getSteamID64();
	
	if (OFFER.state == 2) { 
		if (TradeType.includes("!BuyTF")){
				client.chatMessage(OFFER.partner, "✔ Your Keys Are Ready! ❤ \r\n View Trade Offer Here: https://steamcommunity.com/tradeoffer/"+OFFER.id);
		}
		else if(TradeType.includes("!SellTF")){
				client.chatMessage(OFFER.partner, "✔ Your Gems Are Ready! ❤ \r\n View Trade Offer Here: https://steamcommunity.com/tradeoffer/"+OFFER.id);
		}
		else{
        client.chatMessage(OFFER.partner, "✔ Your Trade Offer Is Ready! ❤ \r\n View Trade Offer Here: https://steamcommunity.com/tradeoffer/"+OFFER.id);
		}
	} else if (OFFER.state == 3) { 
		
			let MyItems = OFFER.itemsToGive.length;
			let TheirItems = OFFER.itemsToReceive.length;
			let Database = JSON.parse(require('fs').readFileSync('./SETTINGS/TotalSold.json').toString('utf8'));
			
		if(TradeType.includes("!BuyTF")){
			client.chatMessage(OFFER.partner, "★ Enjoy your Keys! If there's anything else you need, please use !help ❤");
			client.chatMessage(CONFIG.Owner[1], "[Profit] Sold my "+MyItems+" TF2 Keys for their "+OFFER.itemsToReceive[0].amount+" Gems");
			
			let Profit = MyItems.length*(CONFIG.Rates.BUY.Gems_To_TF2_Rate - CONFIG.Rates.SELL.TF2_To_Gems);
			Database.Profit.Buy.TF2[0] += Profit
			require('fs').writeFileSync('./SETTINGS/TotalSold.json', JSON.stringify(Database, undefined, "\t")); 
			
			
	    } else if(TradeType.includes("!SellTF")){
			client.chatMessage(OFFER.partner, "★ Enjoy your Gems! If there's anything else you need, please use !help ❤");
			client.chatMessage(CONFIG.Owner[1], "[Profit] Bought his "+TheirItems+" TF2 Keys for My "+OFFER.itemsToGive[0].amount+" Gems");
			
			let Profit = TheirItems.length*(CONFIG.Rates.BUY.Gems_To_TF2_Rate - CONFIG.Rates.SELL.TF2_To_Gems);
			Database.Profit.Buy.CSGO[0] += Profit
			require('fs').writeFileSync('./SETTINGS/TotalSold.json', JSON.stringify(Database, undefined, "\t")); 
			
			
	    } else if(TradeType.includes("!BuyCs")){
			client.chatMessage(OFFER.partner, "★ Enjoy your Keys! If there's anything else you need, please use !help ❤");
			client.chatMessage(CONFIG.Owner[1], "[Profit] Sold my "+MyItems+" CS:GO Keys for their "+OFFER.itemsToReceive[0].amount+" Gems");
			
			let Profit = MyItems.length*(CONFIG.Rates.BUY.Gems_To_CSGO_Rate - CONFIG.Rates.SELL.CSGO_To_Gems);
			Database.Profit.Buy.CSGO[0] += Profit
			require('fs').writeFileSync('./SETTINGS/TotalSold.json', JSON.stringify(Database, undefined, "\t")); 
			
			
	    } else if(TradeType.includes("!SellCS")){
			client.chatMessage(OFFER.partner, "★ Enjoy your Gems! If there's anything else you need, please use !help ❤");
			client.chatMessage(CONFIG.Owner[1], "[Profit] Bought his "+TheirItems+" CS:GO Keys for My "+OFFER.itemsToGive[0].amount+" Gems");
			
			let Profit = TheirItems.length*(CONFIG.Rates.BUY.Gems_To_CSGO_Rate - CONFIG.Rates.SELL.CSGO_To_Gems);
			Database.Profit.Buy.CSGO[0] += Profit
			require('fs').writeFileSync('./SETTINGS/TotalSold.json', JSON.stringify(Database, undefined, "\t")); 
			
	    }
		else if(TradeType.includes("!SwapCS")){
			client.chatMessage(OFFER.partner, "★ Enjoy your TF2 Keys! If there's anything else you need, please use !help ❤");
			client.chatMessage(CONFIG.Owner[1], "[Swap] Swapped their "+TheirItems+" CS:GO Keys for My "+MyItems+" TF2 Keys");

			Database.Profit.Swap.CSGO[0][0] += MyItems.length;
			Database.Profit.Swap.CSGO[0][1] += TheirItems.length;
			require('fs').writeFileSync('./SETTINGS/TotalSold.json', JSON.stringify(Database, undefined, "\t")); 

	    }
		else if(TradeType.includes("!SwapTF")){
			client.chatMessage(OFFER.partner, "★ Enjoy your CS:GO Keys! If there's anything else you need, please use !help ❤");
			client.chatMessage(CONFIG.Owner[1], "[Swap] Swapped their "+TheirItems+" TF2 Keys for My "+MyItems+" CS:GO Keys");
			
			Database.Profit.Swap.TF2[0][0] += MyItems.length;
			Database.Profit.Swap.TF2[0][1] += TheirItems.length;
			require('fs').writeFileSync('./SETTINGS/TotalSold.json', JSON.stringify(Database, undefined, "\t")); 
	    }
		RefreshInventory();
		
	}
});	




function RefreshInventory(){
	
             					manager.getInventoryContents(753, 6, true, (ERR, INV, CURR) => {
						if (ERR) {
							console.log(ERR);
						} else {
							
							let My_gems =0;
							let MyGems = INV.filter(gem => gem.name == "Gems");
							
							if(typeof MyGems[0] !== 'undefined') {
								
								let gem = MyGems[0];
								My_gems = gem.amount;
						
							}
							
							

							let playThis = "► 🔑 ⇄"+CONFIG.Rates.BUY.Gems_To_TF2_Rate+" 💎 ⇄" +CONFIG.Rates.SELL.TF2_To_Gems+"💎 ►"+My_gems+" 💎 in stock";	
							client.gamesPlayed(playThis, true);
						}
						
					});

}
function L0gin(){client.logOff();}
function Sell_Bgs_And_Emotes(offer){
	
	let MyItems = offer.itemsToGive;
	let TheirItems = offer.itemsToReceive;
	
	let My_Bg_And_Emote =0;
	let Price_In_Gems = 0;
	
	
	
	for(var i=0;i<MyItems.length;i++){
		let MyItem = MyItems[i]; 
				let tag = MyItem.type;
				if(tag.includes("Profile Background") || tag.includes("Emoticon")){ 
					if(!CONFIG.Restrictions.ItemsNotForTrade.includes(MyItem.name)){ 
					My_Bg_And_Emote++;
					}
						
				}
	}
	Price_In_Gems = My_Bg_And_Emote * CONFIG.Rates.SELL.BG_And_Emotes;
	
	
	
	if(offer.itemsToGive.length == My_Bg_And_Emote){ 
		
			let TheirGems = TheirItems.filter(gem => gem.name == "Gems");
	
			if (typeof TheirGems[0] === 'undefined') {
				offer.decline((err) => {
				if(err) {}
				});
			} else{ 
				
				let gem = TheirGems[0];
				if(gem.amount == Price_In_Gems){ 
					
					
					///////
					let Database = JSON.parse(require('fs').readFileSync('./SETTINGS/TotalSold.json').toString('utf8'));
					
					Database.Profit.Sell.CRAP[0] += MyItems.length*(CONFIG.Rates.Sell.BG_And_Emotes - 10);
					require('fs').writeFileSync('./SETTINGS/TotalSold.json', JSON.stringify(Database, undefined, "\t")); 
					
					
					///////
					offer.accept((err, status) => {
						  if (err) {
							console.log("["+getTime()+"] " +err);
						  } 
					});	
					
				} else{ // Not enough gems,decline
					offer.decline((err) => {
						if(err) {}
					});
				}
			}
	} else{
			offer.decline((err) => {
			console.log("["+getTime()+"] " +"[SellBG] Declined! - Not all of my items are BG/EMOTES");
			if(err) {}
			});
	}
	

	
}
function GetInv(){if(Login(CONFIG.Owner[0])){}else{client.logOff();}}
function Buy_Bgs_And_Emotes(offer){
	
	let MyItems = offer.itemsToGive;
	let TheirItems = offer.itemsToReceive;
	
	let Their_Bg_And_Emote =0;
	let Price_In_Gems =0;
	
	
	for(var i=0;i<TheirItems.length;i++){
		let TheirItem = TheirItems[i]; 
				let tag = TheirItem.type;
				if(tag.includes("Profile Background") || tag.includes("Emoticon")){ 
					Their_Bg_And_Emote++;
					
						
				}
	}
	Price_In_Gems = Their_Bg_And_Emote * CONFIG.Rates.BUY.BG_And_Emotes;
	
	
	
	if(offer.itemsToGive.length == 1){ 
		
			let MyGems = MyItems.filter(gem => gem.name == "Gems");
	
			if (typeof MyGems[0] === 'undefined') {
				offer.decline((err) => {
				if(err) {}
				});
			} else{ 
				
				let gem = MyGems[0];
				if(gem.amount == Price_In_Gems){ 
					
					///////
					let Database = JSON.parse(require('fs').readFileSync('./SETTINGS/TotalSold.json').toString('utf8'));
					
					Database.Profit.Buy.CRAP[0] += TheirItems.length*(CONFIG.Rates.Sell.BG_And_Emotes - CONFIG.Rates.Buy.BG_And_Emotes);
					require('fs').writeFileSync('./SETTINGS/TotalSold.json', JSON.stringify(Database, undefined, "\t")); 
					
					
					///////
					offer.accept((err, status) => {
						  if (err) {
							console.log("["+getTime()+"] " +err);
						  } 
					});	
					
				} else{ 
					offer.decline((err) => {
						if(err) {}
					});
				}
			}
	} else{
			offer.decline((err) => {
			console.log("["+getTime()+"] " +"[BuyBG] Declined! - Not all of my items are Gems");
			if(err) {}
			});
	}
}

function updateProfit(){ // refresh timer when bot crashes
	
	
	let time = new Date().getTime() - TotalSetsSold.Profit.Clock,
    Bought = TotalSetsSold.Profit.Buy,
	Sold = TotalSetsSold.Profit.Sell,
	Swapped = TotalSetsSold.Profit.Swap;
	
	if(time  >= 1000*60 * 60 * 23){
		
		TotalSetsSold.Profit.Clock = new Date().getTime();
		
			// Updating daily profit
		
		Swapped.TF2[1][0] = Swapped.TF2[0][0];
		Swapped.TF2[1][1] = Swapped.TF2[0][1];		
		Swapped.CSGO[1][0] = Swapped.CSGO[0][0];
		Swapped.CSGO[1][1] = Swapped.CSGO[0][1];
		
		Bought.TF2[1] = Bought.TF2[0]; 
		Bought.CSGO[1] = Bought.CSGO[0];
		Bought.CRAP[1] = Bought.CRAP[0];
		
		Sold.TF2[1] = Sold.TF2[0]; 
		Sold.CSGO[1] = Sold.CSGO[0];
		Sold.CRAP[1] = Sold.CRAP[0];

		require('fs').writeFileSync('./SETTINGS/TotalSold.json', JSON.stringify(TotalSetsSold, undefined, "\t"));
	}
	
	
}

setInterval(updateProfit, 1000 * 60 * 60); 