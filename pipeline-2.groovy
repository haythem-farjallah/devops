pipeline {
    tools {
        maven 'maven-latest'

    }

    environment {
        //  registry = 'haythem25/khlail-2'
        registryCredential = 'dockerhub-credentials'
        dockerImage = ''
        DOCKER_REPO = "haythem25/khlail-2"

    }

    agent any

    stages {
        stage('CHECKOUT GIT') {
            steps {
                checkout scmGit(branches: [[name: '*/feature-branch']], extensions: [], userRemoteConfigs: [[credentialsId: 'github-credentials', url: 'https://github.com/haythem-farjallah/devops.git']])
            }
        }

        stage('MVN CLEAN') {
            steps {
                dir('back'){
                    sh 'mvn clean'
                }
            }
        }

        stage('ARTIFACT CONSTRUCTION') {
            steps {
                echo 'ARTIFACT CONSTRUCTION...'
                dir('back') {
                    sh 'mvn package -Dmaven.test.skip=true -P test-coverage'
                }
            }
        }



        stage('BUILDING OUR IMAGES') {
            steps {
                script {

                    // Build the backend image
                    def backendImage = docker.build("${DOCKER_REPO}:backend-latest", "./backend")

                    // Build the front image
                    def frontImage = docker.build("${DOCKER_REPO}:front-latest", "./front")

                    // Save the image IDs for the next stage
                    env.BACKEND_IMAGE_ID = backendImage.id
                    env.FRONT_IMAGE_ID = frontImage.id
                }
            }
        }

        stage('PUSH OUR IMAGES') {
            steps {
                script {
                    docker.withRegistry('', registryCredential) {
                        // Push the backend image
                        docker.image("${DOCKER_REPO}:backend-latest").push()

                        // Push the front image
                        docker.image("${DOCKER_REPO}:front-latest").push()
                    }
                }
            }
        }
        stage('DEPLOYS APPS') {
            steps {
                script {
                    dir('devops') {
                        sh 'docker-compose -f docker-compose.yml up -d'
                    }
                }
            }
        }






    }

//    post {
//        always {
//            emailext(
//            subject: "${currentBuild.result}: Job ${JOB_NAME} [${BUILD_NUMBER}]",
//            body: 'The build is complete.',
//            to: 'khalilouchari12@gmail.com',
//            from: 'haythemfarjallah4@gmail.com'
//            )
//        }
//    }
}
