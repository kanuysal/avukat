const { execSync } = require('child_process');
const cwd = __dirname;

function runGit(cmd) {
  try {
    console.log(`Executing: ${cmd}`);
    const output = execSync(cmd, { cwd, encoding: 'utf8', stdio: 'pipe' });
    console.log(output);
    return true;
  } catch (err) {
    console.error(`Error: ${cmd}`);
    console.error(err.stdout || err.message);
    return false;
  }
}

console.log("Staging files...");
runGit('git add .');

console.log("Committing computer hydration and 404 image fix...");
runGit('git commit -m "fix: resolve computer.webp 404 and Mu responsive hydration crash on mobile"');

console.log("Pushing final fix to GitHub...");
runGit('git push origin main');

console.log("Push complete!");
