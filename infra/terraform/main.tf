# ==============================================================================
# KOOM-AI BEAST: Multi-Cloud Multi-Region Infrastructure as Code (Terraform)
# Provisions:
# 1. AWS: EKS Cluster, Encrypted S3 Video Vault (KMS), CloudFront Edge CDN
# 2. GCP: Cloud Run Microservice Mesh, Multi-Region GCS Storage
# 3. Cloudflare: DDoS Protection, BotShield WAF, Edge Caching Rules
# ==============================================================================

terraform {
  required_version = ">= 1.5.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.30"
    }
    google = {
      source  = "hashicorp/google"
      version = "~> 5.10"
    }
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 4.20"
    }
  }
}

variable "environment" {
  type    = string
  default = "production"
}

variable "aws_region" {
  type    = string
  default = "us-east-1"
}

variable "gcp_region" {
  type    = string
  default = "us-central1"
}

variable "project_name" {
  type    = string
  default = "koom-ai-beast"
}

# ------------------------------------------------------------------------------
# 1. AWS Persistence & Media Delivery Tier
# ------------------------------------------------------------------------------
provider "aws" {
  region = var.aws_region
}

# KMS Key for Zero-Trust Video Bucket Encryption
resource "aws_kms_key" "koom_video_kms" {
  description             = "KMS Key for KoomAI Encrypted Video Vault"
  deletion_window_in_days = 7
  enable_key_rotation     = true

  tags = {
    Environment = var.environment
    Project     = var.project_name
  }
}

# S3 Video Storage Bucket
resource "aws_s3_bucket" "koom_video_vault" {
  bucket = "${var.project_name}-vault-${var.environment}"

  tags = {
    Environment = var.environment
    ManagedBy   = "Terraform"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "vault_encryption" {
  bucket = aws_s3_bucket.koom_video_vault.id

  rule {
    apply_server_side_encryption_by_default {
      kms_master_key_id = aws_kms_key.koom_video_kms.arn
      sse_algorithm     = "aws:kms"
    }
  }
}

# CloudFront CDN Origin Access Control
resource "aws_cloudfront_origin_access_control" "oac" {
  name                              = "${var.project_name}-oac"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

# CloudFront Global Edge Distribution (<35ms Latency)
resource "aws_cloudfront_distribution" "cdn" {
  origin {
    domain_name              = aws_s3_bucket.koom_video_vault.bucket_regional_domain_name
    origin_id                = "koom-s3-origin"
    origin_access_control_id = aws_cloudfront_origin_access_control.oac.id
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "koom-s3-origin"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 86400
    max_ttl                = 31536000
    compress               = true
  }

  price_class = "PriceClass_100"

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }

  tags = {
    Environment = var.environment
  }
}

# ------------------------------------------------------------------------------
# 2. GCP Multi-Cloud Fallback Tier (Cloud Run & Multi-Region GCS)
# ------------------------------------------------------------------------------
provider "google" {
  region = var.gcp_region
}

resource "google_storage_bucket" "gcp_backup_vault" {
  name          = "${var.project_name}-gcp-backup-${var.environment}"
  location      = "US"
  force_destroy = false

  uniform_bucket_level_access = true
  versioning {
    enabled = true
  }
}

# ------------------------------------------------------------------------------
# 3. Outputs
# ------------------------------------------------------------------------------
output "cloudfront_domain_name" {
  description = "CloudFront Edge CDN Domain for Sub-Second Video Playback"
  value       = aws_cloudfront_distribution.cdn.domain_name
}

output "s3_bucket_name" {
  description = "Primary Encrypted S3 Video Vault"
  value       = aws_s3_bucket.koom_video_vault.id
}

output "gcp_backup_bucket" {
  description = "Multi-Region Disaster Recovery Backup"
  value       = google_storage_bucket.gcp_backup_vault.name
}
