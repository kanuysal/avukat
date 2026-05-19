const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const repoUrl = 'https://github.com/kanuysal/avukat.git';
const cwd = __dirname;

function runGit(cmd) {
  try {
    console.log(`Executing: ${cmd}`);
    const output = execSync(cmd, { cwd, encoding: 'utf8', stdio: 'pipe' });
    console.log(output);
    return true;
  } catch (err) {
    console.error(`Error executing ${cmd}:`);
    console.error(err.stdout || err.message);
    return false;
  }
}

// 1. Initialize git if .git directory does not exist
if (!fs.existsSync(path.join(cwd, '.git'))) {
  console.log("Initializing git repository...");
  runGit('git init');
} else {
  console.log("Git repository already initialized.");
}

// 2. Set current branch to main
runGit('git branch -M main');

// 3. Update or add remote origin
try {
  const remotes = execSync('git remote', { cwd, encoding: 'utf8' }).trim();
  if (remotes.includes('origin')) {
    console.log("Removing existing remote 'origin'...");
    runGit('git remote remove origin');
  }
} catch (e) {
  // git remote might fail if no commits, ignore
}

console.log(`Adding remote origin: ${repoUrl}`);
runGit(`git remote add origin ${repoUrl}`);

// 4. Stage all files
console.log("Staging all files...");
runGit('git add .');

// 5. Commit changes
console.log("Committing changes...");
runGit('git commit -m "initial commit - Avukat Erkan Uysal Hukuk Burosu Web Sitesi"');

console.log("Git configuration and commit completed successfully!");
console.log("Ready to push to GitHub...");
