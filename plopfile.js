/* eslint-disable func-names */
/**
 * @param {import('plop').NodePlopAPI} plop
 */
module.exports = function (plop) {
  plop.setGenerator('page', {
    description: 'application page logic',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'page name please',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'app/routes/{{pascalCase name}}/index.tsx',
        templateFile: 'plop-templates/page.hbs',
      },
    ],
  });
};
