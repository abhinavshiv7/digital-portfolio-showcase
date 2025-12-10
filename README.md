# Cloud-Native Polyglot Portfolio (GCP + DevOps)

    

## 📌 Project Overview

This repository hosts a **Cloud-Native Portfolio Website** architected to demonstrate modern **DevOps** and **Site Reliability Engineering (SRE)** practices. Unlike standard static deployments, this project leverages a production-grade CI/CD pipeline, immutable infrastructure using Docker, and automated provisioning via Terraform on **Google Cloud Platform (GCP)**.

The application itself follows a **Polyglot Architecture**, featuring a **React + TypeScript** frontend served via **Nginx** and integrated with a **Supabase** backend for dynamic content management.

-----

## 🏗 System Architecture

The system utilizes a serverless microservices pattern designed for high availability, security, and zero-downtime deployments.

### **Tech Stack**

| Component | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React, TypeScript, Vite | Fast, type-safe UI development. |
| **Web Server** | Nginx (Alpine Linux) | Serving static assets and handling SPA routing within the container. |
| **Containerization** | Docker | Creating lightweight, portable, and immutable application artifacts. |
| **Orchestration** | Google Cloud Run | Serverless container execution with auto-scaling. |
| **Infrastructure as Code** | Terraform | Programmatic provisioning of GCP Artifact Registry and IAM Roles. |
| **CI/CD** | GitHub Actions | Automated build, test, and deployment workflows. |
| **Observability** | Google Cloud Monitoring | Real-time traffic analysis and latency alerting policies. |
| **Region** | `asia-south2` (Delhi) | Low-latency hosting for the target demographic. |

-----

## ☁️ Cloud Architecture & Procedures

This project goes beyond simple hosting by implementing specific Cloud Native procedures on **Google Cloud Platform**:

### **1. Serverless Compute (Cloud Run)**

  * **Procedure:** Deployed the containerized application to **Google Cloud Run**, a fully managed serverless platform.
  * **Configuration:**
      * **Scale-to-Zero:** Configured the service to scale down to 0 instances when idle to optimize costs.
      * **Port Management:** Remapped the container listening port from default `8080` to `80` to match the Nginx configuration, preventing health-check failures.
      * **Concurrency:** Optimized to handle 80 requests per container instance before auto-scaling.

### **2. Immutable Artifact Management (Artifact Registry)**

  * **Procedure:** Transitioned from legacy Container Registry to the modern **Artifact Registry**.
  * **Function:** Acts as a secure, private warehouse for Docker images.
  * **Region Locking:** All artifacts are stored strictly in `asia-south2` (Delhi) to ensure data sovereignty and low latency.

### **3. IAM & Least Privilege Security**

  * **Procedure:** Implemented strict IAM policies using a dedicated Service Account (`github-actions-deployer`) instead of using Owner permissions.
  * **Roles Assigned:**
      * `roles/artifactregistry.writer`: Allows pushing images only.
      * `roles/run.admin`: Grants permission to update the specific Cloud Run service.
      * `roles/iam.serviceAccountUser`: Allows the pipeline to "act as" the service account during deployment.

### **4. Traffic Management (Canary Deployments)**

  * **Procedure:** Utilized Cloud Run's traffic splitting feature to manage "Revisions."
  * **Strategy:** Implemented capacity for **Blue/Green deployments**—routing 90% of traffic to the stable revision and 10% to the new revision for A/B testing before full rollout.

### **5. Observability & Monitoring**

  * **Procedure:** Implemented **Google Cloud Monitoring** (Stackdriver) to track application health.
  * **Metrics:** Configured custom dashboards to visualize `Request Count` and `Container Startup Latency`.
  * **Alerting:** Set up an Alert Policy to trigger email notifications if p99 latency exceeds **1000ms** for a duration of 1 minute.

-----

## 🚀 DevOps Automation Details

### **1. Containerization Strategy (Multi-Stage Builds)**

The application is packaged using a **Multi-Stage Docker Build** to optimize security and size.

  * **Stage 1 (Build):** Uses a heavy `Node.js` image to install dependencies and compile the TypeScript code. **Secrets Injection** is handled here using `ARG` variables to pass Supabase keys securely during the build process without committing them to the repo.
  * **Stage 2 (Production):** Copies *only* the compiled static files to a lightweight `Nginx` Alpine image. This results in a final image size of **\<25MB**.

### **2. Infrastructure as Code (Terraform)**

All critical cloud resources were provisioned using Terraform (`/terraform-portfolio`), ensuring the infrastructure is reproducible and version-controlled.

```hcl
# Example: Creating the Artifact Registry via Code
resource "google_artifact_registry_repository" "my_repo" {
  location      = "asia-south2"
  repository_id = "portfolio-repo-tf"
  format        = "DOCKER"
}
```

### **3. CI/CD Pipeline (GitHub Actions)**

A fully automated pipeline (`.github/workflows/deploy.yml`) triggers on every push to the `main` branch.

1.  **Auth:** Authenticates with GCP using the JSON Service Account Key stored in GitHub Secrets.
2.  **Build:** Injects secrets via `--build-arg` and builds the Docker container.
3.  **Push:** Uploads the tagged image to the private Google Artifact Registry.
4.  **Deploy:** Updates Cloud Run with the new image revision and routes traffic.

-----

## 🛠 Local Development Setup

To run this project locally using Docker (simulating the production environment):

**1. Clone the repository**

```bash
git clone https://github.com/abhinavshiv7/digital-portfolio-showcase.git
cd digital-portfolio-showcase
```

**2. Build the Docker Image**
*Note: You need your Supabase keys for the build.*

```bash
docker build \
  --build-arg VITE_SUPABASE_URL="your_url" \
  --build-arg VITE_SUPABASE_PUBLISHABLE_KEY="your_key" \
  -t portfolio-local .
```

**3. Run the Container**

```bash
docker run -d -p 8080:80 portfolio-local
```

Visit `http://localhost:8080` to see the app running on Nginx.

-----

## 📂 Project Structure

```bash
├── .github/workflows
│   └── deploy.yml          # CI/CD Pipeline Configuration
├── terraform-portfolio
│   └── main.tf             # Infrastructure as Code (GCP Resources)
├── src                     # React Source Code
├── Dockerfile              # Multi-stage Docker instructions
├── nginx.conf              # Web Server configuration
└── vite.config.ts          # Build tool configuration
```

-----

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

-----

*Built by Abhinav - Cloud Engineer*
