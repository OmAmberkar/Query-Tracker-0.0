pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // This now works because Jenkins knows the SCM (Source Control Management)
                checkout scm
            }
        }

        stage('Infrastructure Security Scan') {
            steps {
                script {
                    echo "Requirement 3: Scanning Terraform for vulnerabilities..."
                    // This is the stage that 'catches' your SSH 0.0.0.0/0 flaw
                    sh 'trivy config ./terraform'
                }
            }
        }

        stage('Terraform Plan') {
            steps {
                dir('terraform') {
                    sh 'terraform init'
                    sh 'terraform plan'
                }
            }
        }
    }
}