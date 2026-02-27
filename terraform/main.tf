resource "aws_security_group" "web_app_sg" {
  name        = "web_app_security_group"
  description = "Secured security group for Query Tracker"


  ingress {
    description = "SSH from private network only"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"] # Restricted range
  }


  ingress {
    description = "Web Traffic from internal network"
    from_port   = 4000
    to_port     = 4000
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"] # Restricted range
  }


  egress {
    description = "Allow outbound to specific updates server"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}