import { writeFileSync } from 'fs';
import { execSync } from 'child_process';

// Run the generate-characters script and capture its output
const output = execSync('npx ts-node ./scripts/generate-characters.ts', { encoding: 'utf-8' });

// Write the output to the mock characters file
writeFileSync('./src/data/mockCharacters.ts', output);

console.log('✅ Successfully updated mock characters!');
