use soroban_sdk::{contractimpl, Env, Symbol};

pub struct VaultFactory;

#[derive(Clone)]
pub struct Vault {
    pub manager: Address,
    pub name: Symbol,
    pub ticker: Symbol,
    pub admin_fee: u32,
    pub performance_fee: u32,
    pub lower_circuit: i64,
    pub staking_period: i64,
    pub is_active: bool,
}

#[contractimpl]
impl VaultFactory {
    pub fn create_vault(
        env: Env,
        name: Symbol,
        ticker: Symbol,
        admin_fee: u32,
        performance_fee: u32,
        lower_circuit: i64,
        staking_period: i64,
    ) -> Vault {
        Vault {
            manager: env.invoker(),
            name,
            ticker,
            admin_fee,
            performance_fee,
            lower_circuit,
            staking_period,
            is_active: true,
        }
    }
}
