resource "google_bigquery_dataset" "voitures" {
  dataset_id = "voitures"
  project    = var.gcp_project
  location   = "EU"
  default_table_expiration_ms = 30 * 24 * 60 * 60 * 1000  # 30 jours en millisecondes
  default_partition_expiration_ms = 30 * 24 * 60 * 60 * 1000  # 30 jours en millisecondes
}

resource "google_bigquery_table" "liste_voitures" {
  dataset_id = google_bigquery_dataset.voitures.dataset_id
  table_id   = "liste_voitures"
  project    = var.gcp_project

  schema = <<EOF
  [
    {
      "name": "id",
      "type": "STRING",
      "mode": "REQUIRED"
    },
    {
      "name": "value",
      "type": "INTEGER",
      "mode": "NULLABLE"
    }
  ]
  EOF
}
