FROM centos:centos7

RUN yum update -y

RUN yum install -y bzip2 && \
    yum install -y zip && \
    yum install -y unzip && \
    yum install -y nano && \
    yum install -y git && \
    yum install -y which && \
    yum install -y groff && \
    yum install -y wget && \
    yum -y install \
        epel-release \
        make \
        gcc \
        gcc-c++ \
        git \
        openssl-devel \
        zlib-devel \
        mysql-devel \
        redis \
        sqlite-devel \
        readline-devel

ARG RUBY_PATH=/usr/local
ARG RUBY_VERSION=2.6.5
RUN git clone git://github.com/rbenv/ruby-build.git $RUBY_PATH/plugins/ruby-build \
&&  $RUBY_PATH/plugins/ruby-build/install.sh
RUN ruby-build $RUBY_VERSION $RUBY_PATH/
ENV PATH $RUBY_PATH/bin:$PATH

RUN gem update --system
RUN gem install jekyll
RUN gem install bundler:1.17.2
RUN gem install jekyll-theme-minimal

WORKDIR /home/user

COPY entrypoint.sh /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]