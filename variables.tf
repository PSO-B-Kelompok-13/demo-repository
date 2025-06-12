variable "aws_region" {
  description = "AWS region"
  type        = string
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t2.micro"
}

variable "key_name" {
  description = "Name of the SSH key pair to use"
  type        = string
}

variable "instance_name" {
  description = "Name tag for EC2 instance"
  type        = string
  default     = "to-do-list"
}
