
const { Menu } = require('electron');
const data = require('./data');

module.exports = {
    geraTrayTemplate() {
        // Menu.buildFromTemplate([
        //     { label: 'Cursos'},
        //     { label: '', type: 'separator' },
        //     { label: 'Javascript', type: 'radio', checked: true },
        //     { label: 'Java', type: 'radio' },
        //     { label: 'Photoshop', type: 'radio' }
        // ]);

        let template = [
            {
                'label': 'Cursos'
            },
            {
                type: 'separator'
            }
        ];


        let cursos = data.pegaNomeDosCursos();
        cursos.forEach((curso) => {

            let menuItem = {
                'label': curso,
                type: 'radio'
            }
            template.push(menuItem);
        })

        return template;

    }
}
