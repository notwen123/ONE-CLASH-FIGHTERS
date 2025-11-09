// OneChain Configuration
export const ONECHAIN_CONFIG = {
  // Network
  NETWORK: 'testnet',
  RPC_URL: 'https://rpc-testnet.onelabs.cc:443',
  
  // Contract addresses (DEPLOYED!)
  PACKAGE_ID: process.env.NEXT_PUBLIC_PACKAGE_ID || '0x33339ae0dbf1d8805eb1413639455b1428484d282c0bdcbe15d1b88921e00f65',
  TOURNAMENT_POOL_ID: process.env.NEXT_PUBLIC_TOURNAMENT_POOL_ID || '0xee7943905126911ef2a092df949eed41358f00f24b1da1ed8569b9e34eb0eedf',
  
  // Game settings
  ENTRY_FEE: 10_000_000, // 0.01 OCT in MIST
  MINT_FEE: 1_000_000, // 0.001 OCT for minting fighter
  
  // Fighter types mapping
  FIGHTER_TYPES: {
    'thunder-fist': 0,
    'shadow-strike': 1,
    'cyber-warrior': 2,
    'mystery-fighter': 3,
    'street-king': 4,
    'iron-wall': 5,
  } as const,
  
  // Fighter stats by type
  FIGHTER_STATS: {
    0: { name: 'Thunder Fist', power: 9, speed: 6, defense: 7 },
    1: { name: 'Shadow Strike', power: 7, speed: 10, defense: 5 },
    2: { name: 'Cyber Warrior', power: 8, speed: 8, defense: 6 },
    3: { name: 'Mystery Fighter', power: 6, speed: 7, defense: 9 },
    4: { name: 'Street King', power: 7, speed: 7, defense: 8 },
    5: { name: 'Iron Wall', power: 8, speed: 5, defense: 10 },
  } as const,
};

export type FighterType = keyof typeof ONECHAIN_CONFIG.FIGHTER_TYPES;
