// Character information that is displayed while signing up. 
// See function displayCharacter() above
const startingCharacterData = {
    'character1': ['Atlas Infinity', 'Earth', 'Armor', 1],
    'character2': ['Drexar Vortex', 'Novara', 'Speed', 2],
    'character3': ['Hanzo Shadowstrike', 'Avalon', 'Strength', 3],
    'galaxion': ['Galaxion', 'Tartarus', 'Pure Evil', 4]
};

// Level data split by level
// Level Num : [name of planet, name of commander, number of ships, number of bombers, number of obstacles, number of turrets, number of bosses, Number of gems]
const levelData = {
    0: ['Helix Prime', 'Quantum Quasar', 10, 0, 5, 0, 1, 5],
    1: ['Frozen hold', 'Nebula Trooper', 15, 0, 10, 5, 1, 6],
    2: ['Pegasus Delta', 'Shadow Titan', 20, 5, 15, 5, 1, 7],
    3: ['Solaria', 'Cosmic Circuit', 25, 10, 20, 5, 1, 8],
    4: ['Draco Gamma', 'Necron', 30, 20, 20, 10, 1, 9],
    5: ['Phoenixa', 'Star Spawn', 50, 30, 0, 0, 0, 10],
    6: ['Arcturio', 'Vortex Vandal', 25, 25, 25, 10, 1, 11],
    7: ['Perseus Alpha', 'Ion Interceptor', 30, 30, 30, 20, 2, 12],
    8: ['Celestia', 'Nebula Bot', 45, 45, 35, 50, 1, 13],
    9: ['Aetheria', 'Graviton', 50, 30, 30, 25, 5, 14],
    10: ['Utopia Minor', 'Colossus', 75, 50, 25, 45, 5, 15],
    11: ['Chronos Beta', 'Galaxion', 100, 100, 100, 100, 10, 0],
}

// Stores each enemy in this array while the game is running to keep track of them
var levelLasers = [];
var laserNum = 0;
var enemyImages = [];