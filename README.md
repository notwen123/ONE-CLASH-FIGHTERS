<img width="1052" height="354" alt="image" src="https://github.com/user-attachments/assets/f86be703-63a0-4fd6-9462-a7781e3d6e61" />

# 🥊 ONE CLASH FIGHTERS:

> **A blockchain-powered retro fighting game on OneChain**  
> Play-to-Earn • NFT Fighters • On-Chain Battles • Tournament Staking

[![OneChain](https://img.shields.io/badge/OneChain-Testnet-orange)](https://onelabs.cc)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

---

## 📖 Table of Contents

- [Overview](#overview)
- [Game Features](#game-features)
- [How to Play](#how-to-play)
- [Fighter Roster](#fighter-roster)
- [Game Workflow](#game-workflow)
- [OneChain Integration](#onechain-integration)
- [Smart Contracts](#smart-contracts)
- [Installation](#installation)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)

---

## 🎮 Overview

**One Clash Fighters** is a retro-style fighting game that combines classic arcade gameplay with modern blockchain technology. Built on **OneChain**, players mint unique Fighter NFTs, battle AI opponents, stake OCT tokens in tournaments, and earn rewards based on their performance—all recorded immutably on-chain.

### Key Highlights
- 🎨 **NFT Fighters**: Mint and own unique fighter characters as NFTs
- ⚔️ **On-Chain Battles**: Every victory is recorded on the blockchain
- 💰 **Play-to-Earn**: Stake tokens, win battles, claim prizes
- 🏆 **Live Leaderboard**: Real-time rankings from blockchain events
- 🔗 **Fully Decentralized**: All game logic secured by smart contracts

---
## Gallery 
### Home Page 
<img width="1915" height="935" alt="image" src="https://github.com/user-attachments/assets/88cbb6eb-d212-4874-87fc-59611fd99b62" />

### Select character 

<img width="1911" height="941" alt="image" src="https://github.com/user-attachments/assets/dc62f26a-30a9-43b4-bc99-8da1cfbc7872" />

### You Won 

<img width="1905" height="940" alt="image" src="https://github.com/user-attachments/assets/9da10c0b-43b0-4e1e-a0ff-81422be7ae9e" />

### Save Record in BLockchain

<img width="1654" height="936" alt="image" src="https://github.com/user-attachments/assets/173e8f29-56d6-47c3-b23d-2546275e695f" />

### 

<img width="1232" height="924" alt="image" src="https://github.com/user-attachments/assets/236f4105-1658-45f3-9ef7-37f8d2bdd497" />

### Main Fight 

<img width="1914" height="945" alt="image" src="https://github.com/user-attachments/assets/87b76613-c5f0-4802-9485-c87a67fa0e8a" />

### LeaderBord 

<img width="1912" height="943" alt="image" src="https://github.com/user-attachments/assets/92ebfff9-b8bd-4b4f-b53a-c3fc6169b3ff" />

### Stacking 

<img width="1910" height="942" alt="image" src="https://github.com/user-attachments/assets/cf2168f9-26cc-4e12-aebc-9b31699ae24f" />

### Stacking on OneChain
<img width="1781" height="1021" alt="image" src="https://github.com/user-attachments/assets/0c98efc2-b239-4b99-8ba2-f5a1aa892cb9" />


## 🌟 Game Features

### Core Gameplay
- **6 Unique Fighters** with distinct stats and abilities
- **Progressive Difficulty** - AI gets stronger each round
- **Advanced Combat System** - Punch, kick, jump, duck, defense, and special moves
- **Retro Pixel Art** - Classic arcade aesthetics
- **Responsive Controls** - Smooth keyboard-based combat

### Blockchain Features
- **Fighter NFT Minting** - Create your fighter on-chain
- **Battle Recording** - All victories stored on OneChain
- **Tournament Staking** - Stake OCT tokens to enter prize pools
- **Prize Distribution** - Winners claim rewards automatically
- **Transparent Leaderboard** - Rankings verified on blockchain
- **Profile System** - View your NFT fighter and battle history

---

## 🎯 How to Play

### 1️⃣ **Connect Wallet**
- Click "Connect Wallet" on the home screen
- Connect your OneWallet (OneChain compatible wallet)

### 2️⃣ **Mint Your Fighter**
- Navigate to "Character Select"
- Choose from 6 unique fighters
- Mint your fighter NFT (small fee required)

### 3️⃣ **Enter Combat**
- Select your minted fighter
- Battle against AI opponents
- Use strategic moves to win

### 4️⃣ **Stake & Earn**
- Visit the "Staking" page
- Stake OCT tokens to enter tournaments
- Win battles to increase your prize pool share

### 5️⃣ **Track Progress**
- Check the "Leaderboard" for rankings
- View your "Profile" to see stats and battle history

---

## 🥋 Fighter Roster

Each fighter has unique stats that affect combat performance:

```mermaid
graph LR
    A[Fighter Stats] --> B[Power]
    A --> C[Speed]
    A --> D[Defense]
    B --> E[Damage Output]
    C --> F[Attack Speed]
    D --> G[Damage Reduction]
```

### Fighter Details

| Fighter | Type | Power | Speed | Defense | Specialty |
|---------|------|-------|-------|---------|-----------|
| ⚡ **Thunder Fist** | Boxer | 9 | 6 | 7 | Heavy punches, high damage |
| 🥷 **Shadow Strike** | Ninja | 7 | 10 | 5 | Lightning fast, swift combos |
| 🤖 **Cyber Warrior** | Tech | 8 | 8 | 6 | Balanced, precision strikes |
| 🎭 **Mystery Fighter** | Enigma | 6 | 7 | 9 | Unpredictable, defensive |
| 👑 **Street King** | Brawler | 7 | 7 | 8 | Well-rounded, solid fundamentals |
| 🛡️ **Iron Wall** | Tank | 8 | 5 | 10 | Defensive powerhouse, unbreakable |

### Combat Controls

| Key | Action | Description |
|-----|--------|-------------|
| **←/→** | Move | Walk left/right |
| **↑** | Jump | Leap over attacks |
| **↓** | Duck | Avoid high kicks |
| **D** | Punch | Quick attack (5 damage) |
| **A** | Kick | Strong attack (10 damage) |
| **S** | Defense | Block incoming damage (1% only) |
| **↑ + A** | Jump Kick | Aerial special (15 damage) |

---

## 🔄 Game Workflow

```mermaid
flowchart TD
    Start([Player Visits Game]) --> Connect{Wallet Connected?}
    Connect -->|No| ConnectWallet[Connect OneWallet]
    ConnectWallet --> Connect
    Connect -->|Yes| HasNFT{Has Fighter NFT?}
    
    HasNFT -->|No| Select[Character Select Page]
    Select --> Mint[Mint Fighter NFT]
    Mint --> MintTx[Transaction on OneChain]
    MintTx --> HasNFT
    
    HasNFT -->|Yes| Menu[Main Menu]
    Menu --> Choice{Player Choice}
    
    Choice -->|Fight| Fight[Enter Combat]
    Fight --> Battle[Battle AI Opponent]
    Battle --> Win{Victory?}
    Win -->|Yes| Record[Record Battle On-Chain]
    Record --> Prize[Distribute Prize]
    Prize --> UpdateStats[Update Fighter Stats]
    UpdateStats --> NextRound{Continue?}
    NextRound -->|Yes| Difficulty[Increase Difficulty]
    Difficulty --> Battle
    NextRound -->|No| Menu
    Win -->|No| GameOver[Game Over]
    GameOver --> Menu
    
    Choice -->|Stake| Stake[Tournament Staking]
    Stake --> StakeTx[Stake OCT Tokens]
    StakeTx --> Pool[Add to Prize Pool]
    Pool --> Menu
    
    Choice -->|Leaderboard| Leader[View Rankings]
    Leader --> Fetch[Fetch Blockchain Events]
    Fetch --> Display[Display Top Players]
    Display --> Menu
    
    Choice -->|Profile| Profile[View Profile]
    Profile --> ShowNFT[Display Fighter NFT]
    ShowNFT --> ShowHistory[Show Battle History]
    ShowHistory --> Menu
```

---

## 🔗 OneChain Integration

### Blockchain Architecture

```mermaid
graph TB
    subgraph "Frontend (Next.js)"
        UI[User Interface]
        Wallet[Wallet Connection]
        Hooks[React Hooks]
    end
    
    subgraph "OneChain Blockchain"
        NFT[Fighter NFT Module]
        Battle[Battle System Module]
        Stake[Staking Pool Module]
        Events[Blockchain Events]
    end
    
    subgraph "Smart Contract Functions"
        Mint[mint_fighter]
        Record[record_battle]
        StakeFunc[stake_for_tournament]
        Claim[claim_prize]
    end
    
    UI --> Wallet
    Wallet --> Hooks
    Hooks --> Mint
    Hooks --> Record
    Hooks --> StakeFunc
    Hooks --> Claim
    
    Mint --> NFT
    Record --> Battle
    StakeFunc --> Stake
    Claim --> Stake
    
    Battle --> Events
    Events --> UI
```

### How It Works

1. **Fighter NFT System**
   - Each fighter is a unique NFT on OneChain
   - Stores stats: name, type, level, wins, losses, damage
   - Minted via `fighter_nft::create_fighter` function
   - Owned by player's wallet address

2. **Battle Recording**
   - Every battle result is recorded on-chain
   - Emits `BattleCompleted` event with winner, damage, prize
   - Updates fighter stats (wins, losses, total damage)
   - Creates immutable `BattleRecord` object

3. **Tournament Staking**
   - Players stake OCT tokens to enter tournaments
   - Tokens added to shared prize pool
   - Winners claim 90% of pool (10% burned for APY)
   - All transactions verified on blockchain

4. **Leaderboard System**
   - Fetches `BattleCompleted` events from blockchain
   - Aggregates wins, damage, and prizes per player
   - Real-time rankings updated automatically
   - Fully transparent and verifiable

---

## 📜 Smart Contracts

The game uses three Move smart contract modules deployed on OneChain:

### 1. Fighter NFT Module (`fighter_nft.move`)
```move
// Creates unique fighter NFTs with stats
public entry fun create_fighter(
    name: vector<u8>,
    fighter_type: u8,
    power: u8,
    speed: u8,
    defense: u8,
    ctx: &mut TxContext
)
```

**Features:**
- Mint fighter NFTs with custom stats
- Track wins, losses, level, and damage
- Update stats after each battle
- Transfer ownership between wallets

### 2. Battle System Module (`battle_system.move`)
```move
// Records battle results on-chain
public entry fun record_battle(
    fighter: &mut Fighter,
    winner_damage: u64,
    loser_damage: u64,
    prize: Coin<OCT>,
    round: u64,
    ctx: &mut TxContext
)
```

**Features:**
- Record single-player and PvP battles
- Emit `BattleCompleted` events for leaderboard
- Distribute prize tokens to winners
- Create immutable battle records

### 3. Staking Pool Module (`staking_pool.move`)
```move
// Stake tokens for tournament entry
public entry fun stake_for_tournament(
    pool: &mut TournamentPool,
    stake: Coin<OCT>,
    ctx: &mut TxContext
)
```

**Features:**
- Shared tournament prize pool
- Track total staked and prize pool
- Entry fee: 0.01 OCT (configurable)
- Winners claim 90% of pool

### Contract Deployment

The contracts are deployed on **OneChain Testnet**. To deploy your own:

```bash
# Navigate to Move contracts
cd move

# Build contracts
one move build

# Publish to OneChain
one client publish --gas-budget 100000000
```

After deployment, update `lib/onechain-config.ts` with your package and pool IDs.

---

## 🚀 Installation

### Prerequisites
- Node.js 18+ and npm
- OneWallet browser extension
- OneChain testnet OCT tokens (from faucet)

### Setup Steps

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/one-clash-fighters.git
cd one-clash-fighters
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment (optional)**
```bash
# Create .env.local file
NEXT_PUBLIC_PACKAGE_ID=your_package_id
NEXT_PUBLIC_TOURNAMENT_POOL_ID=your_pool_id
```

4. **Run development server**
```bash
npm run dev
```

5. **Open in browser**
```
http://localhost:3000
```

### Build for Production
```bash
npm run build
npm start
```

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS
- **UI Components**: Custom retro-styled components
- **State Management**: React Hooks

### Blockchain
- **Network**: OneChain Testnet
- **Smart Contracts**: Move Language
- **Wallet Integration**: @mysten/dapp-kit
- **SDK**: @mysten/sui (OneChain compatible)
- **Token**: OCT (OneChain native token)

### Development Tools
- **Package Manager**: npm
- **Linting**: ESLint
- **Type Checking**: TypeScript
- **Version Control**: Git

---

## 🏗️ Architecture

### Project Structure
```
one-clash-fighters/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Home/menu page
│   ├── select/            # Character selection
│   ├── fight/             # Combat gameplay
│   ├── winner/            # Battle results
│   ├── leaderboard/       # Rankings page
│   ├── staking/           # Tournament staking
│   └── profile/           # User profile
├── components/            # React components
├── hooks/                 # Custom React hooks
│   ├── use-fighter-nft.ts
│   ├── use-battle-recording.ts
│   └── use-staking.ts
├── lib/                   # Utilities and config
│   ├── onechain-config.ts
│   ├── fighters.ts
│   └── game-utils.ts
├── move/                  # Smart contracts
│   └── sources/
│       ├── fighter_nft.move
│       ├── battle_system.move
│       └── staking_pool.move
├── providers/             # Context providers
└── public/                # Static assets
```

### Data Flow

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Wallet
    participant OneChain
    participant SmartContract

    User->>Frontend: Connect Wallet
    Frontend->>Wallet: Request Connection
    Wallet->>Frontend: Wallet Connected
    
    User->>Frontend: Mint Fighter
    Frontend->>Wallet: Sign Transaction
    Wallet->>OneChain: Submit Transaction
    OneChain->>SmartContract: Execute mint_fighter
    SmartContract->>OneChain: Create NFT
    OneChain->>Frontend: Transaction Success
    
    User->>Frontend: Win Battle
    Frontend->>Wallet: Sign Battle Record
    Wallet->>OneChain: Submit Transaction
    OneChain->>SmartContract: Execute record_battle
    SmartContract->>OneChain: Emit Event + Update Stats
    OneChain->>Frontend: Battle Recorded
    
    User->>Frontend: View Leaderboard
    Frontend->>OneChain: Query Events
    OneChain->>Frontend: Return Battle Events
    Frontend->>User: Display Rankings
```

---

## 🎨 Game Mechanics

### Combat System
- **Hit Detection**: Precise collision boxes for each fighter
- **Damage Calculation**: Based on fighter power stat and move type
- **Defense Mechanism**: Blocking reduces damage to 1%
- **Special Moves**: Jump kicks deal 50% more damage
- **AI Behavior**: Adaptive difficulty with strategic decision-making

### Progression System
- **Difficulty Scaling**: Each round increases AI damage by 20%
- **Fighter Leveling**: Win battles to increase fighter level
- **Stat Tracking**: Cumulative damage dealt and taken
- **Win/Loss Record**: Permanent on-chain history

### Economy
- **Mint Fee**: 0.001 OCT per fighter NFT
- **Entry Fee**: 0.01 OCT to stake in tournaments
- **Prize Pool**: 90% distributed to winners, 10% burned
- **Battle Rewards**: Variable based on performance

---

## 📊 Leaderboard Metrics

Rankings are calculated from blockchain data:

1. **Total Wins** - Number of victories
2. **Total Damage** - Cumulative damage dealt
3. **Total Prize** - OCT tokens earned
4. **Last Battle** - Timestamp of most recent fight

All data is fetched from `BattleCompleted` events emitted by smart contracts.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🔗 Links

- **OneChain**: [https://onelabs.cc](https://onelabs.cc)
- **OneChain Docs**: [https://docs.onelabs.cc](https://docs.onelabs.cc)
- **OneChain Faucet**: Get testnet OCT tokens
- **OneWallet**: Browser extension for OneChain

---

## 🙏 Acknowledgments

- OneChain team for blockchain infrastructure
- Next.js team for the amazing framework
- Retro gaming community for inspiration

---

<div align="center">

**Built with ❤️ on OneChain**

*Fight. Earn. Dominate.*

</div>
