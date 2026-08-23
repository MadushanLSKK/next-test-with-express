pipeline {
    agent any

    environment {
        SONAR_TOKEN = 'squ_463dd0aceb171886649ddbc906a9ddd97ef82d4b'
        DOCKER_BUILDKIT = '1'
        COMPOSE_DOCKER_CLI_BUILD = '1'
    }

    stages {
        stage('1. Checkout SCM') {
            steps {
                checkout scm
            }
        }

        stage('2. Prepare Environment') {
            steps {
                // Ensure backend directory and dummy .env exist if ignored by git
                sh '''
                mkdir -p backend
                touch backend/.env
                '''
            }
        }

        stage('3. SonarQube Code Analysis') {
            steps {
                script {
                    echo 'Running static code analysis...'
                    sh '''
                    docker run --rm \
                      -v "$WORKSPACE:/usr/src" \
                      sonarsource/sonar-scanner-cli \
                      -Dsonar.host.url=http://host.docker.internal:9000 \
                      -Dsonar.token=${SONAR_TOKEN}
                    '''
                }
            }
        }

        stage('4. Validate Compose Config') {
            steps {
                sh 'docker compose config'
            }
        }

        stage('5. Build Images') {
            steps {
                sh 'docker compose build --no-cache'
            }
        }

        stage('6. Deploy Containers') {
            steps {
                sh 'docker compose up -d'
            }
        }
    }

    post {
        failure {
            echo 'Pipeline failed! Cleaning up...'
            sh 'docker compose down --remove-orphans || true'
        }
        always {
            sh 'docker image prune -f'
        }
    }
}