FROM python:3.9-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Ensure logs directory exists
RUN mkdir -p /app/logs
RUN chmod -R 777 /app/logs

# Make the app accessible outside the container
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0

# Expose the port
EXPOSE 5000

# Run the application
CMD ["flask", "run"]