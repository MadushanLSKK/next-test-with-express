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
                    # Create a temporary container
                    docker create --name sonar_runner sonarsource/sonar-scanner-cli \
                      -Dsonar.host.url=http://host.docker.internal:9000 \
                      -Dsonar.token=${SONAR_TOKEN} \
                      -Dsonar.projectKey=fullstack-devops-app \
                      -Dsonar.projectName="Fullstack Docker DevOps Project" \
                      -Dsonar.sources=backend,frontend \
                      -Dsonar.exclusions="**/node_modules/**,**/.next/**,**/build/**,**/dist/**,**/.git/**" \
                      -Dsonar.scm.disabled=true

                    # Copy workspace files directly into container working directory
                    docker cp . sonar_runner:/usr/src

                    # Start scanner container and cleanup afterwards
                    docker start -a sonar_runner || true
                    docker rm -f sonar_runner
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