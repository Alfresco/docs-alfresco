FROM centos:centos7

RUN yum update -y

RUN yum install -y python3 && \
    yum install -y zip && \
    yum install -y unzip && \
    yum install -y nano && \
    yum install -y git && \
    yum install -y which && \
    yum install -y groff && \
    yum install -y wget && \
    python3 -m pip install --upgrade pip && \
    python3 -m pip install --upgrade awscli && \
    python3 -m pip install --upgrade boto3 && \
    python3 -m pip install --upgrade pyyaml

WORKDIR /home/user

COPY action.py /action.py

ENTRYPOINT ["/action.py"]