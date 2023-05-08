pipeline {
    agent any
    environment {
        PROJECT_ID = 'solid-shelter-279214'
        CLUSTER_NAME = 'autopilot-cluster-1'
        LOCATION = 'us-central1'
        CREDENTIALS_ID = 'gke'
    }
    stages {
        stage("Checkout code") {
            steps {
                checkout scm
            }
        }
        stage("Build image") {
            steps {
                script {
                    myapp = docker.build("solid-shelter-279214/fitside/user-managment-service:${env.BUILD_ID}")
                }
            }
        }
        stage("Push image") {
            steps {
                script {
                    docker.withRegistry("https://gcr.io", "gcr:google-credential-id") {
                            myapp.push("latest")
                            myapp.push("${env.BUILD_ID}")
                    }
                }
            }
        }        
        stage('Deploy to GKE') {
            steps{
                sh "sed -i 's/user-managment-service:latest/user-managment-service:${env.BUILD_ID}/g' deployment.yaml"
                step([$class: 'KubernetesEngineBuilder', projectId: env.PROJECT_ID, clusterName: env.CLUSTER_NAME, location: env.LOCATION, manifestPattern: 'deployment.yaml', credentialsId: env.CREDENTIALS_ID, verifyDeployments: true])
            }
        }
    }    
}