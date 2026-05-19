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

console.log("Staging final files...");
runGit('git add .');

console.log("Committing high-tech text and favicon changes...");
runGit('git commit -m "update: replace high-tech text with Avukat Erkan Uysal, BURSA and copy logo1.svg to icon.svg"');

console.log("Pushing updates to GitHub...");
runGit('git push origin main');

console.log("Push complete!");
