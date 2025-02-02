pipeline {
    agent any
    tools {
        maven 'maven-latest'
    }
    environment {
        SONAR_HOST_URL = 'http://sonarqube:9000'
        DOCKER_REPO = "haythem25/khlail-2"
        REGISTRY_CREDENTIALS = 'dockerhub-credentials'
    }
    stages {
        // --------------------------------
        // STAGE 1: Checkout Code (always runs)
        // --------------------------------
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        // --------------------------------
        // STAGE 2: Merge Request Logic
        // --------------------------------
        stage('Merge Request Pipeline') {
            when {
                allOf {
                    // Triggered by pull_request event (from webhook)
                    expression { env.GIT_EVENT == 'pull_request' }
                    // Check if the PR is NOT merged
                    expression { env.PR_ACTION in ['opened', 'synchronize'] }
                    // Run only for feature branches (e.g., feature/*)
                    branch 'feature/*'
                }
            }
            stages {
                stage('Build') {
                    steps {
                        dir('back') {
                            sh 'mvn clean package -Dmaven.test.skip=true'
                        }
                    }
                }
                stage('Unit Tests') {
                    steps {
                        dir('back') {
                            sh 'mvn test'
                        }
                    }
                }
                stage('SonarQube Analysis') {
                    steps {
                        withCredentials([string(credentialsId: 'sonarqube-token', variable: 'SONAR_TOKEN')]) {
                            dir('back') {
                                sh "mvn sonar:sonar -Dsonar.login=$SONAR_TOKEN -Dsonar.host.url=$SONAR_HOST_URL"
                            }
                        }
                    }
                }
                stage('Integration Tests') {
                    steps {
                        dir('back') {
                            sh 'mvn verify -DskipUnitTests=true'
                        }
                    }
                }
            }
        }

        // --------------------------------
        // STAGE 3: Develop Branch Logic
        // --------------------------------
        stage('Develop Branch Pipeline') {
            when {
                allOf {
                    // Triggered by push to 'develop' branch
                    expression { env.GIT_EVENT == 'push' }
                    branch 'develop'
                }
            }
            stages {
                stage('Build') {
                    steps {
                        dir('back') {
                            sh 'mvn clean package -Dmaven.test.skip=true'
                        }
                    }
                }
                stage('Unit Tests') {
                    steps {
                        dir('back') {
                            sh 'mvn test'
                        }
                    }
                }
                stage('SonarQube Analysis') {
                    steps {
                        withCredentials([string(credentialsId: 'sonarqube-token', variable: 'SONAR_TOKEN')]) {
                            dir('back') {
                                sh "mvn sonar:sonar -Dsonar.login=$SONAR_TOKEN -Dsonar.host.url=$SONAR_HOST_URL"
                            }
                        }
                    }
                }
                stage('Integration Tests') {
                    steps {
                        dir('back') {
                            sh 'mvn verify -DskipUnitTests=true'
                        }
                    }
                }
            }
        }

        // --------------------------------
        // STAGE 4: Release Branch Logic
        // --------------------------------
        stage('Release Pipeline') {
            when {
                allOf {
                    // Triggered by push to release-* branches
                    expression { env.GIT_EVENT == 'push' }
                    branch 'release-*'
                }
            }
            stages {
                stage('Build & Push Docker Images') {
                    steps {
                        script {
                            // Extract version from branch name (e.g., release-1.0.0 → 1.0.0)
                            def version = env.BRANCH_NAME.replace("release-", "").toLowerCase()
                            
                            // Build and push backend image
                            docker.build("${DOCKER_REPO}:backend-${version}", "./back")
                            docker.withRegistry('', REGISTRY_CREDENTIALS) {
                                docker.image("${DOCKER_REPO}:backend-${version}").push()
                            }

                            // Build and push frontend image
                            docker.build("${DOCKER_REPO}:frontend-${version}", "./front")
                            docker.withRegistry('', REGISTRY_CREDENTIALS) {
                                docker.image("${DOCKER_REPO}:frontend-${version}").push()
                            }
                        }
                    }
                }
                stage('Deploy via Webhook') {
                    steps {
                        script {
                            // Trigger deployment (e.g., via GitHub API)
                            def webhookURL = 'https://api.github.com/repos/your-org/your-repo/deployments'
                            withCredentials([string(credentialsId: 'github-token', variable: 'GITHUB_TOKEN')]) {
                                sh """
                                    curl -X POST \
                                    -H 'Authorization: token $GITHUB_TOKEN' \
                                    -H 'Accept: application/vnd.github.ant-man-preview+json' \
                                    $webhookURL \
                                    -d '{\"ref\": \"${env.BRANCH_NAME}\"}'
                                """
                            }
                        }
                    }
                }
            }
        }
    }
}