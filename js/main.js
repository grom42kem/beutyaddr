function generateAddresses() {
    const pattern = document.getElementById('pattern').value;
    const count = parseInt(document.getElementById('count').value);
    const resultsDiv = document.getElementById('results');
    const statsDiv = document.getElementById('stats');
    resultsDiv.innerHTML = '';
    statsDiv.innerHTML = 'Generating...';

    const startTime = performance.now();

    // Prepare pattern, add 0x if needed
    let workingPattern = pattern;
    if (!workingPattern.startsWith('0x')) {
        workingPattern = '0x' + workingPattern;
    }

    const validChars = '0123456789abcdef';
    const addresses = new Set();
    const addressAndKeys = [];
    let attempts = 0;

    while (addressAndKeys.length < count) {
        attempts++;
        // Generate random private key
        const privateKey = '0x' + Array.from(crypto.getRandomValues(new Uint8Array(32)))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
            
        // Create account from private key
        const account = new Web3().eth.accounts.privateKeyToAccount(privateKey);
        const generatedAddress = account.address.toLowerCase();
        
        // Check pattern match
        let matches = true;
        let patternParts = workingPattern.split('*');
        
        // Check beginning
        if (patternParts[0] && !generatedAddress.startsWith(patternParts[0].toLowerCase())) {
            matches = false;
        }
        
        // Check ending
        if (patternParts[patternParts.length - 1] && !generatedAddress.endsWith(patternParts[patternParts.length - 1].toLowerCase())) {
            matches = false;
        }
        
        // Check middle parts
        for (let i = 1; i < patternParts.length - 1; i++) {
            if (patternParts[i] && !generatedAddress.includes(patternParts[i].toLowerCase())) {
                matches = false;
                break;
            }
        }

        if (matches && !addresses.has(generatedAddress)) {
            addresses.add(generatedAddress);
            addressAndKeys.push({
                address: generatedAddress,
                privateKey: privateKey
            });
        }
    }

    const endTime = performance.now();
    const timeSpent = ((endTime - startTime) / 1000).toFixed(2);
    
    statsDiv.innerHTML = `
        Time spent: ${timeSpent} sec<br>
        Total attempts: ${attempts}<br>
        Successful generations: ${addressAndKeys.length}
    `;

    addressAndKeys.forEach(item => {
        const div = document.createElement('div');
        div.className = 'result-item';
        div.innerHTML = `
            <div><strong>Address:</strong> ${item.address}</div>
            <div><strong>Private Key:</strong> ${item.privateKey}</div>
        `;
        resultsDiv.appendChild(div);
    });
}
