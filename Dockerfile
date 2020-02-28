FROM ubuntu:16.04

RUN apt-get update && apt-get install -y \
    build-essential \
    checkinstall \
    libreadline-gplv2-dev libncursesw5-dev libssl-dev \
    libsqlite3-dev tk-dev libgdbm-dev libc6-dev libbz2-dev libffi-dev zlib1g-dev libpq-dev \
    openssh-server \
    sudo \
    vim \
    npm \
    git

COPY certificates/dev-certificate.pub /authorized_keys
RUN mkdir -p ~root/.ssh /var/run/sshd \
	&& chmod 700 ~root/.ssh \
	&& mv /authorized_keys ~root/.ssh/authorized_keys \
	&& chmod 600 ~root/.ssh/authorized_keys

# RUN echo "alias python=/usr/bin/python3" >> /etc/profile

COPY / /var/blog/
WORKDIR /var/blog

EXPOSE 22
CMD ["/usr/sbin/sshd", "-D"]