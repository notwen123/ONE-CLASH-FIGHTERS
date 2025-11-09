/// One Clash Fighters - Battle System Module
/// Records battles on-chain, emits events, and manages prize distribution
module onebrawl_arena::battle_system {
    use one::object::{Self, ID, UID};
    use one::transfer;
    use one::tx_context::{Self, TxContext};
    use one::event;
    use one::coin::{Self, Coin};
    use one::oct::OCT;
    use onebrawl_arena::fighter_nft::{Self, Fighter};

    /// Battle result event - emitted for every battle
    public struct BattleCompleted has copy, drop {
        battle_id: ID,
        winner: address,
        loser: address,
        winner_fighter_id: ID,
        loser_fighter_id: ID,
        winner_damage_dealt: u64,
        loser_damage_dealt: u64,
        prize_amount: u64,
        timestamp: u64,
        round: u64,
    }

    /// Battle record stored on-chain
    public struct BattleRecord has key, store {
        id: UID,
        winner: address,
        loser: address,
        winner_fighter_id: ID,
        loser_fighter_id: ID,
        prize_amount: u64,
        timestamp: u64,
        round: u64,
    }

    /// Record a battle result on-chain
    public entry fun record_battle(
        winner_fighter: &mut Fighter,
        winner_damage: u64,
        loser_damage: u64,
        prize: Coin<OCT>,
        round: u64,
        ctx: &mut TxContext
    ) {
        let battle_id = object::new(ctx);
        let battle_id_inner = object::uid_to_inner(&battle_id);
        let winner = tx_context::sender(ctx);
        let prize_amount = coin::value(&prize);

        // Update winner fighter stats
        fighter_nft::update_fighter_stats(
            winner_fighter,
            true, // won
            winner_damage,
            loser_damage,
        );

        // Emit battle completed event
        event::emit(BattleCompleted {
            battle_id: battle_id_inner,
            winner,
            loser: @0x0, // In single player, loser is AI (no address)
            winner_fighter_id: object::id(winner_fighter),
            loser_fighter_id: object::id_from_address(@0x0), // AI fighter
            winner_damage_dealt: winner_damage,
            loser_damage_dealt: loser_damage,
            prize_amount,
            timestamp: tx_context::epoch_timestamp_ms(ctx),
            round,
        });

        // Create battle record
        let record = BattleRecord {
            id: battle_id,
            winner,
            loser: @0x0,
            winner_fighter_id: object::id(winner_fighter),
            loser_fighter_id: object::id_from_address(@0x0),
            prize_amount,
            timestamp: tx_context::epoch_timestamp_ms(ctx),
            round,
        };

        // Transfer prize to winner
        transfer::public_transfer(prize, winner);
        
        // Store battle record
        transfer::public_transfer(record, winner);
    }

    /// Record a PvP battle (for future multiplayer)
    public entry fun record_pvp_battle(
        winner_fighter: &mut Fighter,
        loser_fighter: &mut Fighter,
        winner_damage: u64,
        loser_damage: u64,
        prize: Coin<OCT>,
        round: u64,
        ctx: &mut TxContext
    ) {
        let battle_id = object::new(ctx);
        let battle_id_inner = object::uid_to_inner(&battle_id);
        let winner = tx_context::sender(ctx);
        let prize_amount = coin::value(&prize);

        // Update both fighters' stats
        fighter_nft::update_fighter_stats(
            winner_fighter,
            true,
            winner_damage,
            loser_damage,
        );

        fighter_nft::update_fighter_stats(
            loser_fighter,
            false,
            loser_damage,
            winner_damage,
        );

        // Emit battle completed event
        event::emit(BattleCompleted {
            battle_id: battle_id_inner,
            winner,
            loser: object::id_to_address(&object::id(loser_fighter)),
            winner_fighter_id: object::id(winner_fighter),
            loser_fighter_id: object::id(loser_fighter),
            winner_damage_dealt: winner_damage,
            loser_damage_dealt: loser_damage,
            prize_amount,
            timestamp: tx_context::epoch_timestamp_ms(ctx),
            round,
        });

        // Create battle record
        let record = BattleRecord {
            id: battle_id,
            winner,
            loser: object::id_to_address(&object::id(loser_fighter)),
            winner_fighter_id: object::id(winner_fighter),
            loser_fighter_id: object::id(loser_fighter),
            prize_amount,
            timestamp: tx_context::epoch_timestamp_ms(ctx),
            round,
        };

        // Transfer prize to winner
        transfer::public_transfer(prize, winner);
        
        // Store battle record
        transfer::public_transfer(record, winner);
    }

    /// Get battle record details
    public fun get_winner(record: &BattleRecord): address {
        record.winner
    }

    public fun get_loser(record: &BattleRecord): address {
        record.loser
    }

    public fun get_prize_amount(record: &BattleRecord): u64 {
        record.prize_amount
    }

    public fun get_timestamp(record: &BattleRecord): u64 {
        record.timestamp
    }

    public fun get_round(record: &BattleRecord): u64 {
        record.round
    }
}
