/// One Clash Fighters - Staking Pool Module
/// Manages tournament entry staking, prize pools, and reward distribution
module onebrawl_arena::staking_pool {
    use one::object::{Self, UID};
    use one::transfer;
    use one::tx_context::{Self, TxContext};
    use one::coin::{Self, Coin};
    use one::oct::OCT;
    use one::balance::{Self, Balance};
    use one::event;
    use one::table::{Self, Table};

    /// Tournament pool for staking
    public struct TournamentPool has key {
        id: UID,
        total_staked: u64,
        prize_pool: Balance<OCT>,
        entry_fee: u64,
        participants: Table<address, u64>, // address -> staked amount
        active: bool,
    }

    /// Event when someone stakes
    public struct PlayerStaked has copy, drop {
        player: address,
        amount: u64,
        total_pool: u64,
    }

    /// Event when prize is claimed
    public struct PrizeClaimed has copy, drop {
        winner: address,
        amount: u64,
    }

    /// Initialize a new tournament pool
    fun init(ctx: &mut TxContext) {
        let pool = TournamentPool {
            id: object::new(ctx),
            total_staked: 0,
            prize_pool: balance::zero(),
            entry_fee: 10_000_000, // 0.01 OCT (10 million MIST)
            participants: table::new(ctx),
            active: true,
        };
        transfer::share_object(pool);
    }

    /// Stake OCT to enter tournament
    public entry fun stake_for_tournament(
        pool: &mut TournamentPool,
        payment: Coin<OCT>,
        ctx: &mut TxContext
    ) {
        assert!(pool.active, 0); // Pool must be active
        
        let amount = coin::value(&payment);
        assert!(amount >= pool.entry_fee, 1); // Must meet minimum entry fee
        
        let sender = tx_context::sender(ctx);
        
        // Add to prize pool
        let payment_balance = coin::into_balance(payment);
        balance::join(&mut pool.prize_pool, payment_balance);
        
        // Track participant
        if (table::contains(&pool.participants, sender)) {
            let current = table::remove(&mut pool.participants, sender);
            table::add(&mut pool.participants, sender, current + amount);
        } else {
            table::add(&mut pool.participants, sender, amount);
        };
        
        pool.total_staked = pool.total_staked + amount;
        
        event::emit(PlayerStaked {
            player: sender,
            amount,
            total_pool: pool.total_staked,
        });
    }

    /// Claim prize after winning
    public entry fun claim_prize(
        pool: &mut TournamentPool,
        ctx: &mut TxContext
    ) {
        let sender = tx_context::sender(ctx);
        
        // Check if player has staked
        assert!(table::contains(&pool.participants, sender), 2);
        
        // Calculate prize (90% of pool goes to winner, 10% burned)
        let total_balance = balance::value(&pool.prize_pool);
        let prize_amount = (total_balance * 90) / 100;
        
        // Take prize from pool
        let prize_balance = balance::split(&mut pool.prize_pool, prize_amount);
        let prize_coin = coin::from_balance(prize_balance, ctx);
        
        // Transfer to winner
        transfer::public_transfer(prize_coin, sender);
        
        event::emit(PrizeClaimed {
            winner: sender,
            amount: prize_amount,
        });
    }

    /// Get pool stats
    public fun get_total_staked(pool: &TournamentPool): u64 {
        pool.total_staked
    }

    public fun get_prize_pool(pool: &TournamentPool): u64 {
        balance::value(&pool.prize_pool)
    }

    public fun get_entry_fee(pool: &TournamentPool): u64 {
        pool.entry_fee
    }

    public fun is_active(pool: &TournamentPool): bool {
        pool.active
    }

    public fun has_staked(pool: &TournamentPool, player: address): bool {
        table::contains(&pool.participants, player)
    }

    public fun get_player_stake(pool: &TournamentPool, player: address): u64 {
        if (table::contains(&pool.participants, player)) {
            *table::borrow(&pool.participants, player)
        } else {
            0
        }
    }
}
