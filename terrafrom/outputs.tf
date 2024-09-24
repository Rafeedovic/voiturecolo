output "dataset_id" {
  value       = google_bigquery_dataset.voitures.dataset_id
  description = "L'ID du dataset BigQuery"
}

output "table_id" {
  value       = google_bigquery_table.liste_voitures.table_id
  description = "L'ID de la table BigQuery"
}
