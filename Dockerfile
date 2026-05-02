FROM nginx:alpine

# Copy static assets into Nginx's serving directory
COPY . /usr/share/nginx/html

# Replace default port 80 with 8080 (Cloud Run default port)
RUN sed -i 's/listen  *80;/listen 8080;/g' /etc/nginx/conf.d/default.conf

# Expose the port Cloud Run will route traffic to
EXPOSE 8080

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
