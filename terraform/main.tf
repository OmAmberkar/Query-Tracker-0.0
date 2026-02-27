resource "aws_security_group" "web_app_sg" {
  name        = "web_app_security_group"
  description = "Secured security group for Query Tracker"

  ingress {
    description = "SSH from private network only"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }

  ingress {
    description = "Web Traffic from internal network"
    from_port   = 4000
    to_port     = 4000
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }

  egress {
    description = "Allow outbound to specific updates server"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

resource "aws_instance" "app_server" {
  ami           = "ami-0c7217cdde317cfec" # Ubuntu 22.04
  instance_type = "t2.micro"
  vpc_security_group_ids = [aws_security_group.web_app_sg.id]

  # REQUIREMENT 4: AI Remediation - Enforce IMDSv2
  metadata_options {
    http_endpoint = "enabled"
    http_tokens   = "required" # This removes the 'Optional' bug in AWS Console
  }

  # REQUIREMENT 4: AI Remediation - Encrypt Root Volume
  root_block_device {
    encrypted = true
  }

  tags = {
    Name = "QueryTrackerServer-Secured"
  }
}

output "public_ip" {
  value = aws_instance.app_server.public_ip
}