# ETH Address Generator by Pattern

A web-based tool for generating Ethereum addresses that match specific patterns. This tool allows you to generate valid ETH addresses and their corresponding private keys based on custom patterns.

## How It Works

The generator uses pattern matching to create Ethereum addresses that match your specified criteria. You can use the `*` character as a wildcard to represent any valid character in the address.

### Pattern Examples:

- `123*` - Generates addresses starting with "0x123"
- `*123` - Generates addresses ending with "123" 
- `123*456` - Generates addresses starting with "123" and ending with "456"
- `*123*` - Generates addresses containing "123" anywhere in the address

### Technical Details

1. The tool generates random private keys using cryptographically secure random number generation
2. Each private key is used to derive its corresponding Ethereum address
3. The generated address is checked against the provided pattern
4. If the address matches the pattern, it's saved along with its private key
5. The process continues until the requested number of addresses is generated

### Security Note

- All generation happens locally in your browser
- Private keys are never sent to any server
- The tool uses the Web3.js library for address generation
- Generated private keys should be handled with care and not shared

## Usage

1. Enter your desired pattern using `*` as wildcards
2. Specify how many addresses you want to generate
3. Click "Generate" and wait for results
4. Each result will show both the address and its private key

## Performance

Generation time depends on:
- Pattern complexity (more specific patterns take longer to match)
- Number of addresses requested
- Your device's processing power

The tool shows statistics including:
- Total time spent
- Number of attempts made
- Number of successful generations

## Technical Requirements

- Modern web browser with JavaScript enabled
- Internet connection (only for loading Web3.js library)

## Warning

Remember that any address with a known private key should be considered compromised. Never send funds to generated addresses unless you fully understand the security implications. 