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

        stage('UNIT TESTS') {
            steps {
                echo 'Launching Unit Tests...'
                dir('back') {
                    sh 'mvn test'
                }
            }
        }

        stage('MVN SONARQUBE') {
            steps {
                dir('back') {
                    withCredentials([usernamePassword(credentialsId: 'sonarqube-credentials', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                        sh 'mvn sonar:sonar -Dsonar.login=$USERNAME -Dsonar.password=$PASSWORD -Dsonar.host.url=http://sonarqube:9000'
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
