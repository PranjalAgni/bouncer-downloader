const inquirer = require('inquirer');
const { ENV_LIST } = require('../constant');

const showMenu = async () => {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'envName',
      choices: ENV_LIST,
      message: 'Enter environment name',
      prefix: '🚀',
    },
    {
      type: 'input',
      name: 'startDate',
      message: 'Enter start date (dd/mm/yyyy)',
      prefix: '⚡️',
    },
    {
      type: 'input',
      name: 'endDate',
      message: 'Enter end date (dd/mm/yyyy)',
      prefix: '🦄',
    },
  ]);

  return answers;
};

module.exports = showMenu;
