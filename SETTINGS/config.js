//Swap Bot V 1.0 by Go Fast Config

/// Take your time filling in this file. Read green text for instructions.

module.exports = {
    USERNAME: "",
    PASSWORD: "",
    SHAREDSECRET: "",
    IDENTITYSECRET: "",
    STEAMAPIKEY: "",
    INVITETOGROUPID: "", // Invite users to this group
	
	MAXMSGPERSEC: 2,
	Owner: [""],  // In the first slot, put in the SteamID of the bot (between ""), after that put in the SteamID's of admins (so you get access to Admin commands)
	Activation_Key: "", // Paste here the Activation Key you received when Buying the bot from Go Fast / Fast Bots
	Promo_Code: "", //If you received a Promo Code from my bot (https://steamcommunity.com/id/FastLevels), put it in here. If other people use your Promo Code on my bot, you'll be rewarded with Free Keys! Leave this field blank if you don't want to advertise your promo code
	
	Ignore_Msgs: ["","",""], // the bot will ignore msg's from these users + ignore trade offers [it won't decline or accept], (useful for when you want to buy sets from other bots & don't want them to block eachother)
	// fill in steamid 64 of these accounts.
	
    Rates: { // These rates are optional. It's your responsibility to update them frequently
		
		// *NOTE* : When you sell/buy sets the bot will msg you with the amount of profit you made. This is determined by your buy & sell rates below.
		
		
			// CS:GO to TF2 Swap 
			
		Key_Swaps:{
			
			CS_To_TF2: [6,7], // !SwapTF Rate - You're giving 10 CS:GO keys for their 13 TF2 Keys (Choose what keys you're giving/receiving below)
			TF2_To_CS: [1,1], // !SwapCS Rate - You're giving 10 TF2 keys for their 9 CS:GO Keys (Choose what keys you're giving/receiving below)
			
			// To change the rates above: 
				// *the first number is how many keys you're giving
				// *the second number is how many keys they're giving
				
			Max_Swap: 100 // users can only swap up to 100 keys at a time
		},
		
			// Buy Rates
		
		BUY:{ 
			Gems_To_TF2_Rate: 70000, // User gives us 7,000 Gems for 1 of Our TF2 Key
			Gems_To_CSGO_Rate: 45000, // User gives us 4500 Gems for 1 of Our CS:GO Key
			BG_And_Emotes: 10 // Buy OTHERS Any Backgrounds & Emotes for 15 Gems Each 
		},
		
			// Sell Rates
		
		SELL:{ 
			TF2_To_Gems: 4000, // User gives us 1 TF2 Key  for Our 4,000 Gems
			CSGO_To_Gems: 3300, // User gives us 1 CSGO Key  for Our 3300 Gems
			BG_And_Emotes: 20 // Sell YOUR Backgrounds & Emotes for 20 Gems Each (if you have bg's & emotes you don't want to sell, put their name in ItemsNotForTrade below between '')
		}
    },
	Restrictions:{
		ItemsNotForTrade: ['','','','',''], // don't trade these items when people try to buy it with gems. Add more items between the ' '
		// you can add more items by extending this pattern. Do this right or get rekt.
		MaxBuy: 100,
		MaxSell: 200
	},
    MESSAGES: {
        WELCOME: "Hey, welcome to my Swap Bot. Use !Help for Commands!", // the message your bot sends to new friends
        HELP: "↓ ↓ ↓ \r\n\r\n                         ★ Buy My Stuff Commands ★\r\n---------------------------- \r\n✔ !BuyTF [Number] ► Buy My TF2 Keys for Your Gems\r\n✔ !BuyCS [Number] ► Buy My CS:GO Keys for Your Gems\r\n✔ !SwapCS [Number] ► Swap your CS:GO Keys for our TF2 Keys\r\n✔ !SwapTF [Number] ► Swap your TF2 Keys for our CS:GO Keys\r\n\r\n                         ★ Sell Me Stuff Commands ★\r\n---------------------------- \r\n✔ !SellTF [Number] ► Sell Your TF2 Keys for My Gems\r\n✔ !SellCS [Number] ► Sell Your CS:GO Keys for My Gems\r\n\r\n                         ★ Information Commands ★\r\n---------------------------- \r\n✔ !Price  ► Check bot's Rates\r\n✔ !Check ► Check how many Keys & Gems you have to See what the Bot Can Offer you!\r\n✔ !Info  ► Information about the Owner & Staff \r\n\r\n★ !Promo ► See how to get Steam Bots with a Discount!",
		ADMINHELP: "↓ ↓ ↓ \r\n\r\n                         ★ Admin Commands: ★ \r\n-------------------------------\r\n✔ !Profit ► Check the profits made in the last 24 hours\r\n✔ !Block [SteamID64] ► Block a user\r\n✔ !Unblock [SteamID64] ► Unblock a user\r\n✔ !Broadcast ► Send a message to everyone in your friend list (Set the msg in config -> BROADCAST)"
    },
		
	TF2_Keys: [ // TF2 Keys you're giving & accept. Delete or add a new line to add/remove keys
	
		"Mann Co. Supply Crate Key"
	],
	CSGO_Keys: [ // CSGO Keys you're giving & accept. Delete or add a new line to add/remove keys
	"Clutch Case Key",
	"Glove Case Key",
	"Gamma Case Key",
	"Gamma 2 Case Key",
	"Chroma Case Key",
	"Chroma 2 Case Key",
	"Chroma 3 Case Key",
	"Spectrum Case Key",
	"Spectrum 2 Case Key",
	"Operation Phoenix Case Key",
	"Falchion Case Key",
	"Operation Breakout Case Key",
	"Operation Wildfire Case Key",
	"eSports Key",
	"Winter Offensive Case Key",
	"Operation Vanguard Case Key",
	"Shadow Case Key",
	"Horizon Case Key",
	"Danger Zone Case Key",
	"Prisma Case Key"
	]
}









