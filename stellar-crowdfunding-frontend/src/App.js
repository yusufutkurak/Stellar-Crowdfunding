import React, { useState } from 'react';
import './App.css';  // App CSS dosyasını projenize dahil ettiğinizden emin olun

function App() {
  const [id, setId] = useState('');
  const [owner, setOwner] = useState('GBSCOURI5TYQGGXM7J2O7YJK6L4KVT4OAPNIZHTFHLGCAA4HCX7HQ3QQ');
  const [targetAmount, setTargetAmount] = useState('');
  const [duration, setDuration] = useState('');
  const [rewardTiers, setRewardTiers] = useState([{ amount: '1000', reward: 'First Tier Reward' }, { amount: '5000', reward: 'Second Tier Reward' }]);
  const [fundProjectId, setFundProjectId] = useState('');
  const [fundAmount, setFundAmount] = useState('');
  const [refundProjectId, setRefundProjectId] = useState('');
  const [response, setResponse] = useState(null);

  const handleCreateProject = async (event) => {
    event.preventDefault();

    const data = {
      id: parseInt(id),
      owner,
      target_amount: parseInt(targetAmount),
      duration: parseInt(duration),
      reward_tiers: rewardTiers.map((tier) => ({ 
        amount: parseInt(tier.amount), 
        reward: tier.reward 
      })),
    };

    console.log('Sending Data:', data);

    const response = await fetch('http://localhost:3000/create_project', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    setResponse(result);
    console.log(result);
  };

  const handleFundProject = async (event) => {
    event.preventDefault();

    const data = {
      id: parseInt(fundProjectId),
      amount: parseInt(fundAmount),
    };

    console.log('Sending Data:', data);

    const response = await fetch('http://localhost:3000/fund_project', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    setResponse(result);
    console.log(result);
  };

  const handleRefund = async (event) => {
    event.preventDefault();

    const data = {
      id: parseInt(refundProjectId),
    };

    console.log('Sending Data:', data);

    const response = await fetch('http://localhost:3000/refund', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    setResponse(result);
    console.log(result);
  };

  const handleRewardTierChange = (index, field, value) => {
    const newRewardTiers = rewardTiers.map((tier, idx) => {
      if (idx === index) {
        return { ...tier, [field]: value };
      }
      return tier;
    });
    setRewardTiers(newRewardTiers);
  };

  const addRewardTier = () => {
    setRewardTiers([...rewardTiers, { amount: '', reward: '' }]);
  };

  return (
    <div className="App">
      <nav className="navbar">
        <a href="/">Ana Sayfa</a>
      </nav>

      <div className="container">
        <h1>Stellar Crowdfunding</h1>
        <form onSubmit={handleCreateProject}>
          <label>
            Project ID:
            <input type="text" value={id} onChange={(e) => setId(e.target.value)} required />
          </label>
          <label>
            Owner:
            <input type="text" value={owner} onChange={(e) => setOwner(e.target.value)} required />
          </label>
          <label>
            Target Amount:
            <input type="number" value={targetAmount} onChange={(e) => setTargetAmount(e.target.value)} required />
          </label>
          <label>
            Duration:
            <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} required />
          </label>
          {rewardTiers.map((tier, index) => (
            <div key={index}>
              <label>
                Reward {index + 1} Amount:
                <input type="number" value={tier.amount} onChange={(e) => handleRewardTierChange(index, 'amount', e.target.value)} required />
              </label>
              <label>
                Reward {index + 1} Description:
                <input type="text" value={tier.reward} onChange={(e) => handleRewardTierChange(index, 'reward', e.target.value)} required />
              </label>
            </div>
          ))}
          <button type="button" onClick={addRewardTier}>Add Reward Tier</button>
          <button type="submit">Create Project</button>
        </form>
        <hr />
        <form onSubmit={handleFundProject}>
          <h2>Fund a Project</h2>
          <label>
            Project ID:
            <input type="text" value={fundProjectId} onChange={(e) => setFundProjectId(e.target.value)} required />
          </label>
          <label>
            Amount to Fund:
            <input type="number" value={fundAmount} onChange={(e) => setFundAmount(e.target.value)} required />
          </label>
          <button type="submit">Fund Project</button>
        </form>
        <hr />
        <form onSubmit={handleRefund}>
          <h2>Refund a Project</h2>
          <label>
            Project ID:
            <input type="text" value={refundProjectId} onChange={(e) => setRefundProjectId(e.target.value)} required />
          </label>
          <button type="submit">Refund</button>
        </form>
        {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
      </div>
    </div>
  );
}

export default App;