// Character information that is displayed while signing up. 
// See function displayCharacter() above
const startingCharacterData = {
    'character1': ['Atlas Infinity', 'Earth', 'Armor', 1],
    'character2': ['Drexar Vortex', 'Novara', 'Speed', 2],
    'character3': ['Hanzo Shadowstrike', 'Avalon', 'Strength', 3],
    'galaxion': ['Galaxion', 'Tartarus', 'Pure Evil', 4]
};

// Level data split by level
// Level Num : [name of planet, name of commander, number of ships, number of bombers, number of obstacles, number of turrets, number of bosses]
const levelData = {
    0: ['Helix Prime', 'Quantum Quasar', 10, 0, 5, 0, 1],
    1: ['Frozenhold', 'Nebula Trooper', 15, 0, 10, 5, 1],
    2: ['Pegasus Delta', 'Shadow Titan', 20, 5, 15, 5, 1],
    3: ['Solaria', 'Cosmic Circuit', 25, 10, 20, 5, 1],
    4: ['Draco Gamma', 'Necron', 30, 20, 20, 10, 1],
    5: ['Phoenixia', 'Star Spawn', 50, 30, 0, 0, 0],
    6: ['Arcturion', 'Vortex Vandal', 25, 25, 25, 10, 1],
    7: ['Perseus Alpha', 'Ion Interceptor', 30, 30, 30, 20, 2],
    8: ['Celestia', 'Nebula Bot', 45, 45, 35, 50, 1],
    9: ['Aetheria', 'Graviton', 50, 30, 30, 25, 5],
    10: ['Utopia Minor', 'Colossus', 75, 50, 25, 45, 5],
    11: ['Chronos Beta', 'Galaxion', 100, 100, 100, 100, 10],
}