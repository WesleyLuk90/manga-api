const Generator = require('yeoman-generator');
const _ = require('lodash');

module.exports = class RepositoryGenerator extends Generator {
    prompting() {
        return this.prompt([{
            type: 'input',
            name: 'name',
            message: 'Repository Name?',
        }]).then((answers) => {
            this.name = answers.name;
        });
    }

    create() {
        const repositoryName = _.upperFirst(_.camelCase(this.name));
        const options = {
            repository_name: repositoryName,
        };
        this.fs.copyTpl('./templates/repository/templates/Repository.js.tpl',
            `repositories/${repositoryName}/${repositoryName}.js`, options);
        this.fs.copyTpl('./templates/repository/templates/RepositoryCapabilities.js.tpl',
            `repositories/${repositoryName}/${repositoryName}Capabilities.js`, options);
        this.fs.copyTpl('./templates/repository/templates/RepositoryGetManga.js.tpl',
            `repositories/${repositoryName}/${repositoryName}GetManga.js`, options);
        this.fs.copyTpl('./templates/repository/templates/RepositoryGetChapter.js.tpl',
            `repositories/${repositoryName}/${repositoryName}GetChapter.js`, options);
        this.fs.copyTpl('./templates/repository/templates/RepositoryGetPage.js.tpl',
            `repositories/${repositoryName}/${repositoryName}GetPage.js`, options);
        this.fs.copyTpl('./templates/repository/templates/RepositorySearch.js.tpl',
            `repositories/${repositoryName}/${repositoryName}Search.js`, options);
    }
};
