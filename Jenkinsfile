pipeline {
    agent any

    environment {
        SONAR_TOKEN = 'squ_463dd0aceb171886649ddbc906a9ddd97ef82d4b'
        DOCKER_BUILDKIT = '1'
    }

    stages {
        stage('1. Checkout SCM') {
            steps {
                checkout scm
            }
        }

        stage('2. Prepare Environment') {
            steps {
                withCredentials([
                    string(credentialsId: 'MONGO_URI_SECRET', variable: 'SECRET_URI'),
                    string(credentialsId: 'JWT_SECRET', variable: 'SECRET_JWT')
                ]) {
                    sh """
                    mkdir -p backend
                    printf "MONGO_URI=%s\\nJWT_SECRET=%s\\nPORT=5000\\n" "${SECRET_URI}" "${SECRET_JWT}" > backend/.env
                    """
                }
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
                      -Dsonar.token=${SONAR_TOKEN} \
                      -Dsonar.projectKey=fullstack-devops-app \
                      -Dsonar.sources=.
                    '''
                }
            }
        }

        stage('4. Validate Compose Config') {
            steps {
                sh 'docker compose config'
            }
        }

        stage('5. Deploy Containers') {
            steps {
                sh 'docker compose up -d --build'
            }
        }
    }

    post {
        always {
            sh 'docker image prune -f'
        }
    }
}