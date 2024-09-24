provider "google" {
    credentials = file("../../../terraform_creds/.gcloud/application_default_credentials.json")
    project = var.gcp_project
    region  = "europe-west1"
}
