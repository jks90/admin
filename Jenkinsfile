pipeline {
    agent any

    environment {
        APP_NAME = 'admin'
        IMAGE_NAME = 'admin'
        TLG_ID = '831858839'
    }

    stages {

        stage('Read Version from package.json') {
            steps {
                script {
                    // Leer la versión desde el package.json usando jq
                    IMAGE_TAG = sh(script: "cat package.json | jq -r '.version'", returnStdout: true).trim()
                    echo "La versión extraída del package.json es: ${IMAGE_TAG}"
                }
            }
        }

        stage('Docker Build') {
            steps {
                echo 'Construyendo la imagen Docker...'
                script {
                    sh "docker build -t ${DOCKER_REPOSITORY}/${IMAGE_NAME}:${IMAGE_TAG} ."
                    sh "docker build -t ${DOCKER_REPOSITORY}/${IMAGE_NAME}:latest ."
                }
            }
        }

        stage('Push Docker image') {
            steps {
                echo 'Pushing docker image to nexus'
                script {
                    withCredentials([usernamePassword(credentialsId: 'docker_credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        sh "echo ${DOCKER_PASS} | docker login ${DOCKER_REPOSITORY} -u ${DOCKER_USER} --password-stdin"
                        sh "docker push ${DOCKER_REPOSITORY}/${IMAGE_NAME}:${IMAGE_TAG}"
                        sh "docker push ${DOCKER_REPOSITORY}/${IMAGE_NAME}:latest"
                    }
                    
                }
            }
        }

        stage('Docker Deploying') {
            steps {
                echo 'Desplegando la imagen Docker...'
                script {
                    sh "docker stop ${APP_NAME} || true"
                    sh "docker run --rm -d --name ${APP_NAME} -p 80:3000  ${DOCKER_REPOSITORY}/${IMAGE_NAME}:${IMAGE_TAG}"
                }
            }
        }

        stage('Notification') {
            steps {
                echo 'Notificando via telegram'
                script {
                    sh """
                        curl -X POST 'http://${SERVER_IP}:7082/api/message' \
                        -H 'accept: */*' \
                        -H 'Content-Type: application/json' \
                        -d '{
                            "destini": "${TLG_ID}",
                            "message": "Se ha subido la imagen ${APP_NAME}:${IMAGE_TAG} a nexus",
                            "propietary": "Jenkins"
                        }'
                    """
                }
            }
        }

    }
}
