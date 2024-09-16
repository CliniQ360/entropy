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