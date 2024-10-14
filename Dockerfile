# Base image for the React app
FROM node:14 AS react-build

# Setup working directory for React app
WORKDIR /app/react-app

# Copy and build the React app
COPY ./react-app ./
RUN npm install
RUN npm run build

# Base image for the Python backend
FROM python:3.8 AS python-backend

# Setup working directory for backend
WORKDIR /app/backend

# Copy and install Python dependencies
COPY ./backend/requirements.txt ./
RUN pip install -r requirements.txt

# Copy backend code
COPY ./backend ./

# Base image for the Rating Classification
FROM python:3.8 AS rating-classification

# Setup working directory for Rating Classification
WORKDIR /app/Rating_Classification

# Copy and install Python dependencies
COPY ./Rating_Classification/requirements.txt ./
RUN pip install -r requirements.txt

# Copy Rating Classification code
COPY ./Rating_Classification ./

# Final stage to run all services
FROM node:14 AS final

# Copy built React app from the previous stage
COPY --from=react-build /app/react-app/build /app/react-app/build

# Copy backend and Rating Classification from their respective stages
COPY --from=python-backend /app/backend /app/backend
COPY --from=rating-classification /app/Rating_Classification /app/Rating_Classification

# Expose ports for each service
EXPOSE 3000 5000 8080

# Start all services (you might need to adjust this based on your actual service commands)
CMD ["sh", "-c", "cd /app/react-app && npm start & cd /app/backend && python app.py & cd /app/Rating_Classification && python app.py"]
