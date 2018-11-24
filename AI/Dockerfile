FROM python:3.6

WORKDIR /app/

COPY requirements.txt /app/
RUN pip install -r ./requirements.txt

ENV ENVIRONMENT production

EXPOSE 5000

COPY main.py __init__.py /app/

CMD python main.py
