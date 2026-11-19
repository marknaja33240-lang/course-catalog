pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build & Deploy') {
            steps {
                sh 'docker compose up -d --build'
            }
        }
    }
}