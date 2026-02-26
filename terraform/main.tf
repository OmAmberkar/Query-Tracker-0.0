# Security Group with restricted access
resource "aws_security_group" "web_app_sg" {
  name        = "web_app_security_group"
  description = "Secured security group for Query Tracker"

  # Fix: Restrict SSH to a specific IP (Replace with your actual IP)
  ingress {
    description = "SSH from admin only"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["YOUR_IP_ADDRESS/32"] # Change this to your public IP
  }

  # Fix: Restrict App Port
  ingress {
    description = "Web Traffic"
    from_port   = 4000
    to_port     = 4000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # In a real prod environment, use a Load Balancer
  }

  # Fix: Add description to egress and restrict if possible
  egress {
    description = "Allow all outbound traffic"
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

  # Fix: Encrypt the Root Volume
  root_block_device {
    encrypted = true
  }

  # Fix: Require IMDSv2 (Enforce Tokens)
  metadata_options {
    http_tokens = "required"
    http_endpoint = "enabled"
  }

  tags = {
    Name = "QueryTrackerServer-Secured"
  }
}