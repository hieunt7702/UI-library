const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Install husky
execSync('npx husky install', { stdio: 'inherit' });

const huskyDir = path.join(__dirname, '..', '.husky');
if (!fs.existsSync(huskyDir)) {
  fs.mkdirSync(huskyDir);
}

// Create pre-commit hook
const preCommitContent = `#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm run test
npm run lint
npm run build
`;

// Create commit-msg hook
const commitMsgContent = `#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx --no -- commitlint --edit $1
`;

// Write hooks with LF line endings
fs.writeFileSync(
  path.join(huskyDir, 'pre-commit'),
  preCommitContent.replace(/\r\n/g, '\n'),
  { encoding: 'utf8' }
);

fs.writeFileSync(
  path.join(huskyDir, 'commit-msg'),
  commitMsgContent.replace(/\r\n/g, '\n'),
  { encoding: 'utf8' }
);