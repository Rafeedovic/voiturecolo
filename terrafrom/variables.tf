variable "gcp_project" {
  description = "Le nom du projet Google Cloud"
  type        = string
}

variable "dataset_id" {
  description = "L'ID du dataset BigQuery"
  type        = string
}

variable "location" {
  description = "la localisation du projet BigQuery"
  type        = string
}