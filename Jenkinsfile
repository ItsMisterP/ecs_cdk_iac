pipeline {
    agent any

    stages {
        stage('Install dependencies') {
            steps {
                echo 'Installing..'
                yarn 'install'
            }
        }
        stage('Deploy Infrastructure') {
            steps {
                sh 'cdk deploy'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}