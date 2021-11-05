pipeline {
    agent any

    stages {
        stage('Install dependencies') {
            steps {
                echo 'Installing..'
                yarn 'install'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}