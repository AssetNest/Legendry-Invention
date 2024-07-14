use soroban_sdk::{contractimpl, Env, Symbol};

pub struct InvestmentContract;

#[derive(Clone)]
pub struct Investment {
    pub investor: Address,
    pub amount: i64,
    pub vault_id: Symbol,
    pub timestamp: i64,
}

#[contractimpl]
impl InvestmentContract {
    pub fn invest_in_vault(env: Env, vault_id: Symbol, amount: i64) -> Investment {
        assert!(amount > 0, "Investment amount must be greater than zero");

        Investment {
            investor: env.invoker(),
            amount,
            vault_id,
            timestamp: env.block().timestamp,
        }
    }
}
