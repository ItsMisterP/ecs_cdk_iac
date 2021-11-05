pipeline {
    agent any

    stages {
        stage('Install dependencies') {
            steps {
                echo 'Installing..'
                npm '-i aws-cdk'
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
    post{
        failure {
            echo 'Failure while destroying'
            sh 'cdk destroy'
        }
    }
}