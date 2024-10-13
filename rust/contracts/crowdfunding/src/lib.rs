#![no_std]

use soroban_sdk::{
    contract, contracterror, contractimpl, contracttype, symbol_short, Address, Env, IntoVal, Symbol, TryFromVal, Vec, Map, vec,
    String as SdkString,
};

#[derive(Debug, Clone, Copy)]
#[contracterror]
pub enum CrowdfundingError {
    Expired = 1,            // Proje süresi dolmuş
    ZeroAmount = 2,         // Sıfır miktarda fon sağlanmaya çalışılıyor
    NotExpired = 3,         // Proje henüz süresi dolmamış
    GoalReached = 4,        // Proje hedefe ulaşmış
}

#[derive(Debug, Clone)]
#[contracttype]
pub struct RewardTier {
    pub amount: u64,
    pub reward: Symbol,
}

#[derive(Debug, Clone)]
#[contracttype]
pub struct Project {
    pub id: u32,
    pub owner: Address,
    pub target_amount: u64,
    pub raised_amount: u64,
    pub deadline: u64,
    pub reward_tiers: Vec<RewardTier>,
}

#[contract]
pub struct CrowdfundingContract;

#[contractimpl]
impl CrowdfundingContract {
    pub fn create_project(
        env: Env,
        id: u32,
        owner: Address,
        target_amount: u64,
        duration: u64,
        reward_tiers: Vec<RewardTier>,
    ) -> Project {
        let start_time = env.ledger().timestamp();
        let deadline = start_time + duration;

        let project = Project {
            id,
            owner,
            target_amount,
            raised_amount: 0,
            deadline,
            reward_tiers,
        };

        // Projeyi kalıcı depolamaya kaydet
        let mut storage = env.storage().persistent();
        storage.set(&id, &project);

        project
    }

    pub fn fund_project(
        env: Env,
        id: u32,
        amount: u64,
    ) -> Result<Vec<Symbol>, CrowdfundingError> {
        let current_time = env.ledger().timestamp();

        // Projeyi kalıcı depolamadan getir
        let mut storage = env.storage().persistent();
        let mut project: Project = storage.get(&id).unwrap();

        if current_time > project.deadline {
            return Err(CrowdfundingError::Expired);
        }

        if amount == 0 {
            return Err(CrowdfundingError::ZeroAmount);
        }

        project.raised_amount += amount;

        // Projeyi güncellenmiş haliyle tekrar depolayın
        storage.set(&id, &project);

        if project.raised_amount >= project.target_amount {
            return Ok(vec![&env, symbol_short!("goal_re")]);
        }

        let mut rewards = Vec::new(&env);
        for tier in project.reward_tiers.iter() {
            if project.raised_amount >= tier.amount {
                let mut new_rewards = rewards.clone();
                new_rewards.push_back(tier.reward.clone());
                rewards = new_rewards;
            }
        }

        Ok(rewards)
    }

    pub fn refund(
        env: Env,
        id: u32,
    ) -> Result<Symbol, CrowdfundingError> {
        let current_time = env.ledger().timestamp();

        // Projeyi kalıcı depolamadan getir
        let mut storage = env.storage().persistent();
        let mut project: Project = storage.get(&id).unwrap();

        if current_time <= project.deadline {
            return Err(CrowdfundingError::NotExpired);
        }

        if project.raised_amount < project.target_amount {
            project.raised_amount = 0;

            // Projeyi güncellenmiş haliyle tekrar depolayın
            storage.set(&id, &project);

            return Ok(symbol_short!("refunded"));
        }

        Err(CrowdfundingError::GoalReached)
    }
}
