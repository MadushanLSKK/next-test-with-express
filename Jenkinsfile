pipeline {
    agent any

    environment {
        DOCKER_BUILDKIT = '1'
    }

    stages {
        stage('1. Prepare Environment') {
            steps {
                withCredentials([
                    string(credentialsId: 'MONGO_URI_SECRET', variable: 'SECRET_URI'),
                    string(credentialsId: 'JWT_SECRET', variable: 'SECRET_JWT'),
                    string(credentialsId: 'SONAR_TOKEN', variable: 'SONAR_AUTH_TOKEN')
                ]) {
                    sh '''
                    mkdir -p backend
                    # Using single quotes avoid Groovy String interpolation security warnings
                    printf "MONGO_URI=%s\nJWT_SECRET=%s\nPORT=5000\n" "$SECRET_URI" "$SECRET_JWT" > backend/.env
                    '''
                }
            }
        }

        stage('2. SonarQube Code Analysis') {
            steps {
                withCredentials([string(credentialsId: 'SONAR_TOKEN', variable: 'SONAR_AUTH_TOKEN')]) {
                    script {
                        echo 'Running static code analysis...'
                        sh '''
                        # Simplified scanner execution relying on sonar-project.properties
                        docker create --name sonar_runner sonarsource/sonar-scanner-cli \
                          -Dsonar.host.url=http://host.docker.internal:9000 \
                          -Dsonar.token=$SONAR_AUTH_TOKEN

                        docker cp . sonar_runner:/usr/src
                        docker start -a sonar_runner || true
                        docker rm -f sonar_runner
                        '''
                    }
                }
            }
        }

        stage('3. Validate Compose Config') {
            steps {
                sh 'docker compose config'
            }
        }

        stage('4. Deploy Containers') {
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