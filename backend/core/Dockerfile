# FROM debian:bookworm
# RUN apt-get update && apt-get upgrade -y
# RUN apt-get install gcc -y \
#     python3 \
#     python3-pip \
#     python3-venv -y \
#     && apt-get clean
# # RUN apt-get install -y openjdk-17-jdk
# ENV VIRTUAL_ENV=/opt/venv
# RUN python3 -m venv $VIRTUAL_ENV
# ENV PATH="$VIRTUAL_ENV/bin:$PATH"
# COPY requirements.txt .
# RUN pip install -r requirements.txt
# COPY . /app
# WORKDIR /app
# ENV PATH="/venv/bin:$PATH"
# ENTRYPOINT [ "/bin/bash" ]
# CMD ["run.sh"]

FROM python:3.8.12 as builder
RUN apt-get update && apt-get upgrade -y
RUN python -m venv /venv
ENV PATH="/venv/bin:$PATH"
COPY requirements.txt requirements.txt
RUN python3 -m pip install -r requirements.txt

FROM python:3.8.12-slim-buster
RUN apt-get update && apt-get upgrade -y
COPY --from=builder /venv /venv
COPY . /app
WORKDIR /app
ENV PATH="/venv/bin:$PATH"
EXPOSE 8500
ENTRYPOINT [ "/bin/bash" ]
CMD ["run.sh"]