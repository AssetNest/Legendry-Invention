use soroban_sdk::{contractimpl, Env, Symbol};

pub struct FundManagement;

#[derive(Clone)]
pub struct Vault {
    pub manager: Address,
    pub total_funds: i64,
    pub lower_circuit: i64,
    pub is_active: bool,
}

#[contractimpl]
impl FundManagement {
    pub fn manage_funds(env: Env, vault_id: Symbol, amount: i64, is_deposit: bool) {
        let mut vault: Vault = env.contract_data().get(vault_id).unwrap();

        assert!(env.invoker() == vault.manager, "Only the vault manager can manage funds");

        if is_deposit {
            vault.total_funds += amount;
        } else {
            assert!(vault.total_funds >= amount, "Insufficient funds in vault");
            vault.total_funds -= amount;
        }

        env.contract_data().set(vault_id, &vault);
    }

    pub fn check_lower_circuit(env: Env, vault_id: Symbol) -> bool {
        let vault: Vault = env.contract_data().get(vault_id).unwrap();
        vault.total_funds <= vault.lower_circuit
    }
}
