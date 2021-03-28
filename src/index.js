require('dotenv-safe').config();
const clear = require('clear');
const figlet = require('figlet');
const showMenu = require('./lib/menu');
const startBouncer = require('./lib/bouncer');

const main = async () => {
  try {
    clear();

    console.log(
      figlet.textSync('Bouncer', { horizontalLayout: 'full', font: 'Sweet' })
    );

    const answers = await showMenu();

    await startBouncer(answers);
  } catch (ex) {
    console.log('Error: ', ex);
  }
};

main();
