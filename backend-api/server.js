const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { exec } = require('child_process');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// Create Project Endpoint (Existing)
app.post('/create_project', (req, res) => {
    const { id, owner, target_amount, duration, reward_tiers } = req.body;

    console.log('Received Request Data:', req.body);

    const formattedRewardTiers = reward_tiers.map((tier) => {
        return {
            amount: parseInt(tier.amount),
            reward: `symbol_short!("${tier.reward.replace(/\"/g, '\\"')}")`
        };
    });

    const formattedRewardTiersStr = JSON.stringify(formattedRewardTiers)
        .replace(/\\/g, '\\\\')  // Double escape for JSON string
        .replace(/\"/g, '\\"');  // Double escape for quote marks

    const command = `
        stellar contract invoke \\
            --id CBVYZIEYA5RR55S6CTBENKTXYH5SS62ZMCIIWRMZD74E3A4LVX6JKW3O \\
            --source GCM2775ZYB5GN5KFCMZTH7UR3UJE44C2OL7LJVRWU2IP6EBF6ZHSAUBX \\
            --network testnet \\
            --send=yes \\
            -- create_project \\
            --id ${parseInt(id)} \\
            --owner ${owner} \\
            --target_amount ${parseInt(target_amount)} \\
            --duration ${parseInt(duration)} \\
            --reward_tiers "${formattedRewardTiersStr}"
    `;

    console.log('Executing Command:', command);

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return res.status(500).json({
                code: error.code,
                killed: error.killed,
                signal: error.signal,
                cmd: error.cmd,
                message: error.message,
            });
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
        res.status(200).json({ output: stdout || stderr });
    });
});

// Fund Project Endpoint
app.post('/fund_project', (req, res) => {
    const { id, amount } = req.body;

    console.log('Received Request Data:', req.body);

    const command = `
        stellar contract invoke \\
            --id CBVYZIEYA5RR55S6CTBENKTXYH5SS62ZMCIIWRMZD74E3A4LVX6JKW3O \\
            --source GCM2775ZYB5GN5KFCMZTH7UR3UJE44C2OL7LJVRWU2IP6EBF6ZHSAUBX \\
            --network testnet \\
            --send=yes \\
            -- fund_project \\
            --id ${parseInt(id)} \\
            --amount ${parseInt(amount)}
    `;

    console.log('Executing Command:', command);

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return res.status(500).json({
                code: error.code,
                killed: error.killed,
                signal: error.signal,
                cmd: error.cmd,
                message: error.message,
            });
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
        res.status(200).json({ output: stdout || stderr });
    });
});

// Refund Endpoint
app.post('/refund', (req, res) => {
    const { id } = req.body;

    console.log('Received Request Data:', req.body);

    const command = `
        stellar contract invoke \\
            --id CBVYZIEYA5RR55S6CTBENKTXYH5SS62ZMCIIWRMZD74E3A4LVX6JKW3O \\
            --source GCM2775ZYB5GN5KFCMZTH7UR3UJE44C2OL7LJVRWU2IP6EBF6ZHSAUBX \\
            --network testnet \\
            --send=yes \\
            -- refund \\
            --id ${parseInt(id)}
    `;

    console.log('Executing Command:', command);

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return res.status(500).json({
                code: error.code,
                killed: error.killed,
                signal: error.signal,
                cmd: error.cmd,
                message: error.message,
            });
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
        res.status(200).json({ output: stdout || stderr });
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});