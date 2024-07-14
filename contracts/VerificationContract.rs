use soroban_sdk::{contractimpl, Env, Symbol};

pub struct VerificationContract;

#[derive(Clone)]
pub struct Trader {
    pub wallet: Address,
    pub twitter_handle: Symbol,
    pub credit_score: u32,
    pub is_verified: bool,
}

#[contractimpl]
impl VerificationContract {
    pub fn verify_trader(env: Env, wallet: Address, twitter_handle: Symbol, credit_score: u32) {
        let mut trader: Trader = env.contract_data().get(wallet).unwrap_or_else(|| Trader {
            wallet,
            twitter_handle: twitter_handle.clone(),
            credit_score,
            is_verified: false,
        });

        assert!(!trader.is_verified, "Trader is already verified");

        trader.is_verified = true;
        env.contract_data().set(wallet, &trader);
    }
}
