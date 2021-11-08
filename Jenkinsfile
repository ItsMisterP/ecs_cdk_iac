pipeline {
    agent any

    stages {
        stage('Install dependencies') {
            steps {
                echo 'Installing..'
                npm 'install --save aws-cdk'
                sh 'whereis aws-cdk'
                yarn 'install'
            }
        }
        stage('Deploy Infrastructure') {
            steps {

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