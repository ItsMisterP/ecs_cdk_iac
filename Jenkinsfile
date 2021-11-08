pipeline {
    agent any

    stages {
        stage('Install dependencies') {
            steps {
                echo 'Installing..'
                npm 'install -g aws-cdk'
                yarn 'install'
                sh 'cdk deploy'
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
    post{
        failure {
            echo 'Failure while destroying'
            sh 'cdk destroy'
        }
    }
}