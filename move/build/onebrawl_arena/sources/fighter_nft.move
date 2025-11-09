/// One Clash Fighters - Fighter NFT Module
/// Manages fighter NFTs with stats, leveling, and battle tracking
module onebrawl_arena::fighter_nft {
    use one::object::{Self, UID};
    use one::transfer;
    use one::tx_context::{Self, TxContext};
    use one::event;

    /// Fighter NFT with stats for One Clash Fighters game
    public struct Fighter has key, store {
        id: UID,
        name: vector<u8>,
        fighter_type: u8, // 0=Thunder Fist, 1=Shadow Strike, 2=Cyber Warrior, 3=Mystery Fighter, 4=Street King, 5=Iron Wall
        power: u8,
        speed: u8,
        defense: u8,
        wins: u64,
        losses: u64,
        total_damage_dealt: u64,
        total_damage_taken: u64,
        level: u8,
    }

    /// Event emitted when a fighter is minted
    public struct FighterMinted has copy, drop {
        fighter_id: ID,
        owner: address,
        name: vector<u8>,
        fighter_type: u8,
        power: u8,
        speed: u8,
        defense: u8,
    }

    /// Event emitted when fighter stats are updated
    public struct FighterStatsUpdated has copy, drop {
        fighter_id: ID,
        wins: u64,
        losses: u64,
        level: u8,
    }

    /// Mint a new fighter NFT
    public fun mint_fighter(
        name: vector<u8>,
        fighter_type: u8,
        power: u8,
        speed: u8,
        defense: u8,
        ctx: &mut TxContext
    ): Fighter {
        let fighter_id = object::new(ctx);
        let id_copy = object::uid_to_inner(&fighter_id);
        
        event::emit(FighterMinted {
            fighter_id: id_copy,
            owner: tx_context::sender(ctx),
            name,
            fighter_type,
            power,
            speed,
            defense,
        });

        Fighter {
            id: fighter_id,
            name,
            fighter_type,
            power,
            speed,
            defense,
            wins: 0,
            losses: 0,
            total_damage_dealt: 0,
            total_damage_taken: 0,
            level: 1,
        }
    }

    /// Create and transfer fighter to sender
    public entry fun create_fighter(
        name: vector<u8>,
        fighter_type: u8,
        power: u8,
        speed: u8,
        defense: u8,
        ctx: &mut TxContext
    ) {
        let fighter = mint_fighter(name, fighter_type, power, speed, defense, ctx);
        transfer::public_transfer(fighter, tx_context::sender(ctx));
    }

    /// Update fighter stats after a battle
    public fun update_fighter_stats(
        fighter: &mut Fighter,
        won: bool,
        damage_dealt: u64,
        damage_taken: u64,
    ) {
        if (won) {
            fighter.wins = fighter.wins + 1;
            // Level up every 3 wins
            if (fighter.wins % 3 == 0) {
                fighter.level = fighter.level + 1;
                // Increase stats on level up
                fighter.power = fighter.power + 1;
                fighter.speed = fighter.speed + 1;
                fighter.defense = fighter.defense + 1;
            };
        } else {
            fighter.losses = fighter.losses + 1;
        };
        
        fighter.total_damage_dealt = fighter.total_damage_dealt + damage_dealt;
        fighter.total_damage_taken = fighter.total_damage_taken + damage_taken;

        event::emit(FighterStatsUpdated {
            fighter_id: object::uid_to_inner(&fighter.id),
            wins: fighter.wins,
            losses: fighter.losses,
            level: fighter.level,
        });
    }

    /// Get fighter stats (read-only accessors)
    public fun get_name(fighter: &Fighter): vector<u8> {
        fighter.name
    }

    public fun get_fighter_type(fighter: &Fighter): u8 {
        fighter.fighter_type
    }

    public fun get_power(fighter: &Fighter): u8 {
        fighter.power
    }

    public fun get_speed(fighter: &Fighter): u8 {
        fighter.speed
    }

    public fun get_defense(fighter: &Fighter): u8 {
        fighter.defense
    }

    public fun get_wins(fighter: &Fighter): u64 {
        fighter.wins
    }

    public fun get_losses(fighter: &Fighter): u64 {
        fighter.losses
    }

    public fun get_level(fighter: &Fighter): u8 {
        fighter.level
    }

    public fun get_total_damage_dealt(fighter: &Fighter): u64 {
        fighter.total_damage_dealt
    }

    public fun get_total_damage_taken(fighter: &Fighter): u64 {
        fighter.total_damage_taken
    }
}
