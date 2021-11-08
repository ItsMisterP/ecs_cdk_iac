pipeline {
    agent any

    stages {
        stage('Install dependencies') {
            steps {
                echo 'Installing..'
                npm 'install --save aws-cdk'
                yarn 'install'
            }
        }
        stage('Deploy Infrastructure') {
            steps {
                sh 'npx cdk deploy'
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