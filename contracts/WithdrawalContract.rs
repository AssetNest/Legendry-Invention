use soroban_sdk::{contractimpl, Env, Symbol};

pub struct WithdrawalContract;

#[derive(Clone)]
pub struct Investment {
    pub investor: Address,
    pub amount: i64,
    pub vault_id: Symbol,
    pub timestamp: i64,
}

#[derive(Clone)]
pub struct Vault {
    pub lower_circuit: i64,
    pub staking_period: i64,
    pub total_funds: i64,
    pub is_active: bool,
}

#[contractimpl]
impl WithdrawalContract {
    pub fn withdraw_funds(env: Env, investment_id: Symbol) {
        let mut investment: Investment = env.contract_data().get(investment_id).unwrap();
        let vault: Vault = env.contract_data().get(investment.vault_id).unwrap();

        assert!(env.invoker() == investment.investor, "Only the investor can withdraw funds");
        assert!(
            env.block().timestamp >= investment.timestamp + vault.staking_period || vault.total_funds <= vault.lower_circuit,
            "Funds cannot be withdrawn yet"
        );

        investment.amount = 0;
        env.contract_data().set(investment_id, &investment);

        // Logic to transfer funds to the investor
    }
}
