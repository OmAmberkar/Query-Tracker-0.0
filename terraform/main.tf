# Create a Security Group with an Intentional Flaw [cite: 22, 23]
resource "aws_security_group" "web_app_sg" {
  name        = "web_app_security_group"
  description = "Security group for web application with intentional vulnerability"

  # VULNERABILITY: SSH open to everyone (0.0.0.0/0) [cite: 24]
  ingress {
    description = "SSH from anywhere"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Allow Web Traffic for the Application
  ingress {
    description = "Web Traffic"
    from_port   = 4000
    to_port     = 4000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# Provision a Compute Instance (Virtual Machine) [cite: 20]
resource "aws_instance" "app_server" {
  ami           = "ami-0c7217cdde317cfec" # Amazon Linux 2023 AMI (Region specific)
  instance_type = "t2.micro"
  vpc_security_group_ids = [aws_security_group.web_app_sg.id]

  tags = {
    Name = "QueryTrackerServer"
  }
}

# Output the Public IP to use for documentation later [cite: 80]
output "public_ip" {
  value = aws_instance.app_server.public_ip
}