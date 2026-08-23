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

        stage('2. SonarQube Code Analysis') {
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

        stage('3. Validate Compose Config') {
            steps {
                sh 'docker compose config'
            }
        }

        stage('4. Build Images') {
            steps {
                sh 'docker compose build --no-cache'
            }
        }

        stage('5. Deploy Containers') {
            steps {
                sh 'docker compose up -d'
            }
        }
    }

    post {
        failure {
            echo 'Pipeline failed! Cleaning up...'
            sh 'docker compose down'
        }
        always {
            sh 'docker image prune -f'
        }
    }
}