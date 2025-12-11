# 1. Provider Configuration
provider "google" {
  project = "hallowed-port-477716-r9"
  region  = "asia-south2"
  zone    = "asia-south2-a"
}

# 2. Enable APIs (Infrastructure needs these turned on first)
resource "google_project_service" "run_api" {
  service            = "run.googleapis.com"
  disable_on_destroy = false
}

resource "google_project_service" "artifact_registry_api" {
  service            = "artifactregistry.googleapis.com"
  disable_on_destroy = false
}

# --- NEW: Enable the IAM API (Fixes your Error 403) ---
resource "google_project_service" "iam_api" {
  service            = "iam.googleapis.com"
  disable_on_destroy = false
}

# 3. Create the Artifact Registry
resource "google_artifact_registry_repository" "my_repo" {
  location      = "asia-south2"
  repository_id = "portfolio-repo-tf"
  description   = "Docker repository managed by Terraform IaC"
  format        = "DOCKER"

  depends_on = [google_project_service.artifact_registry_api]
}

# 4. Create a Service Account
resource "google_service_account" "terraform_deployer" {
  account_id   = "terraform-deployer-sa"
  display_name = "Service Account created by Terraform"

  # --- NEW: Wait for IAM API to be enabled before creating this ---
  depends_on   = [google_project_service.iam_api]
}

# 5. Output the results
output "repository_url" {
  value = "${google_artifact_registry_repository.my_repo.location}-docker.pkg.dev/hallowed-port-477716-r9/${google_artifact_registry_repository.my_repo.repository_id}"
}