FROM ubuntu:16.04

RUN apt-get update && apt-get install -y \
    openssh-server \
    sudo \
    python3-dev \
    python3-pip \
    vim \
    npm \
    git

COPY certificates/dev-certificate.pub /authorized_keys
RUN mkdir -p ~root/.ssh /var/run/sshd \
	&& chmod 700 ~root/.ssh \
	&& mv /authorized_keys ~root/.ssh/authorized_keys \
	&& chmod 600 ~root/.ssh/authorized_keys

RUN echo "alias python=/usr/bin/python3" >> /etc/profile

COPY / /var/django_project/
WORKDIR /var/django_project

EXPOSE 22
CMD ["/usr/sbin/sshd", "-D"]