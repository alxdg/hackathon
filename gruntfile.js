module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        scp: {
            options: {
                host: '10.31.2.29',
                username: 'pi',
                password: 'RaspberryPi123'
            },
            your_target: {
                files: [{
                        cwd: 'directory',
                        src: '**/*',
                        filter: 'isFile',
                        dest: '/home/pi/sandbox/hack-server/'
                    }]
            }
        }

    });

    grunt.loadNpmTasks('grunt-scp');

    grunt.registerTask('default', ['scp:your_target']);
};