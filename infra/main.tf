# resource "digitalocean_floating_ip" "web" {
#   region            = "nyc1"
# }

resource "digitalocean_tag" "webtag" {
  name = "web-site"
}

resource "digitalocean_droplet" "web" {
  name               = "asesorvncucuta-test-terraform"
  size               = "s-1vcpu-1gb"
  image              = "${var.image_id}"
  region             = "nyc1"
  tags               = ["${digitalocean_tag.webtag.id}"]
  lifecycle {
    create_before_destroy = true
  }
  provisioner "local-exec" {
    command = "sleep 160 && curl ${self.ipv4_address}"
  }
  ssh_keys           = [20843332, 21489207],
  # user_data          = "${file("web.conf")}"
}

resource "digitalocean_floating_ip_assignment" "web-api" {
  depends_on = ["digitalocean_droplet.web"]
  ip_address = "178.128.133.22"
  lifecycle {
    create_before_destroy = true
  }
  droplet_id = "${digitalocean_droplet.web.id}"
}