FROM alpine:3.9

RUN mkdir -p /etc/bzt.d

ADD 99-zinstallID.json /etc/bzt.d/
ADD 90-artifacts-dir.json /etc/bzt.d/
ADD 90-no-console.json /etc/bzt.d/

RUN apk --update add \
                 libxml2-dev \
                 libxslt-dev \
                 openjdk8 \
                 python \
                 python-dev \
                 zlib \
                 py-pip && \
    apk --update add --virtual build-dependencies \
                 linux-headers \
                 libc-dev \
                 gcc && \
    pip install --upgrade pip bzt virtualenv && \
    adduser -u 1000  -h /home/bzt -s /bin/ash -S taurus && \
    apk del build-dependencies


RUN mkdir /bzt && chown 1000 /bzt
WORKDIR /bzt

#FROM blazemeter/taurus

USER 1000

RUN bzt -o settings.default-executor=jmeter -o execution.scenario.requests.0=http://localhost/ \
        -o execution.iterations=1 -o execution.hold-for=1 -o execution.throughput=1


VOLUME ["/bzt-config"]
VOLUME ["/bzt"]

COPY addcar.json /bzt/bzt_artifacts/
COPY test1.json /bzt/bzt_artifacts/
COPY 01_query.yml /bzt-config/
COPY 00_mutation.yml /bzt-config/



CMD bzt -l bzt.log /bzt-config/*.yml

