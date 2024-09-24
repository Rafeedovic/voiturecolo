provider "google" {
    credentials = file("./.gcloud/application_default_credentials.json")
    project = var.gcp_project
    region  = "europe-west1"
}
