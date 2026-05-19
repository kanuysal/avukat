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

console.log("Staging modified files...");
runGit('git add .');

console.log("Committing hydration fix...");
runGit('git commit -m "fix: resolve responsive About section hydration mismatch crash on mobile"');

console.log("Pushing final hydration fix to GitHub...");
runGit('git push origin main');

console.log("Push complete!");
