data "aws_ami" "ubuntu" {
  most_recent = true

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/*20.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
    
  owners = ["099720109477"] # Canonical
}

provider "aws" {
  region  = "ap-southeast-2"
}

resource "aws_instance" "app_server" {
  ami           = "ami-001f2488b35ca8aad" # Pastikan AMI ini tersedia di region ap-southeast-2
  instance_type = "t2.micro"
  key_name      = "PSO B Kelompok 13" # Pastikan key pair ini sudah ada di AWS

  tags = {
    Name = "to-do-list"
  }
}