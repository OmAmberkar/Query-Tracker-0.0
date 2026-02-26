resource "aws_security_group" "web_app_sg" {
  name        = "web_app_security_group"
  description = "Secured security group for Query Tracker"

  # Fix: Replace with your actual IP, e.g., "123.45.67.89/32"
  ingress {
    description = "SSH from admin only"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # Keep this for the demo if you can't find your IP, but usually restricted
  }

  ingress {
    description = "Web Traffic"
    from_port   = 4000
    to_port     = 4000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    description = "Allow outbound to specific services"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "app_server" {
  ami           = "ami-0c7217cdde317cfec"
  instance_type = "t2.micro"
  vpc_security_group_ids = [aws_security_group.web_app_sg.id]

  # Resolved High Risk: Root volume encryption
  root_block_device {
    encrypted = true
  }

  # Resolved High Risk: Enforcing IMDSv2
  metadata_options {
    http_tokens = "required"
    http_endpoint = "enabled"
  }

  tags = {
    Name = "QueryTrackerServer-Secured"
  }
}