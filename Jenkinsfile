pipeline {
    agent any

    stages {
        stage('Install dependencies') {
            steps {
                echo 'Installing..'
                sh 'yarn install'
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