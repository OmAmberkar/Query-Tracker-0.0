resource "aws_security_group" "web_app_sg" {
  name        = "web_app_security_group"
  description = "Security group with intentional vulnerabilities for audit testing"

  # BUG 1 (CRITICAL): SSH open to the world
  # Impact: Brute-force attacks can be launched from any IP.
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # BUG 2 (CRITICAL): Backend port open to the world
  ingress {
    from_port   = 4000
    to_port     = 4000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # BUG 3 (CRITICAL): Unrestricted outbound traffic
  # Impact: If compromised, the server can communicate with malicious servers.
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# Vulnerable EC2 Instance
resource "aws_instance" "app_server" {
  ami           = "ami-0c7217cdde317cfec" # Amazon Linux 2023
  instance_type = "t2.micro"
  vpc_security_group_ids = [aws_security_group.web_app_sg.id]

  # BUG 4 (HIGH): IMDSv2 is NOT enforced
  # Impact: Vulnerable to SSRF attacks to steal AWS credentials.
  # (Missing metadata_options block)

  # BUG 5 (HIGH): Root volume is NOT encrypted
  # Impact: Data at rest is unprotected.
  # (Missing root_block_device encryption setting)

  tags = {
    Name = "QueryTracker-Vulnerable-Server"
  }
}