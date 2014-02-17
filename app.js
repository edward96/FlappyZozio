var Clay = require('clay-encryption');

// Your clay.io secret key
var secretKey = 'noKHDM65753dVuVhZ0pR7OY3gSRLcU';

// The player's unique identifier (received from client js - Clay.player.identifier)
var userIdentifier = 'ae6d4e443c79f0c52655135aaa9d6b5d';

// Create object and store user identifier/secret key
var clay = new Clay( userIdentifier, secretKey );

// Example options for an achievment
var options = { score: 1000 };

// encode
var token = clay.encode( options );

console.log(token);

// Send token as part of options, so client-side: 
// achievement = new Clay.achievement( { jwt: tokenFromServer } );
// achievement.award();