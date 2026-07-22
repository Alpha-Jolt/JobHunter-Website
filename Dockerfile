# Stage 1: Build the React Application
FROM node:22-alpine AS build

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --include=optional

# Copy source code
COPY . .

# Add build arguments for frontend
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_ANON_KEY
ARG VITE_STRIPE_SUPABASE_PUBLISHABLE_KEY
ARG VITE_TURNSTILE_SITE_KEY
ARG VITE_POSTHOG_API_KEY
ARG VITE_POSTHOG_HOST

# Set them as environment variables so Vite can use them during the build
ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
ENV VITE_SUPABASE_ANON_KEY=$VITE_SUPABASE_ANON_KEY
ENV VITE_STRIPE_SUPABASE_PUBLISHABLE_KEY=$VITE_STRIPE_SUPABASE_PUBLISHABLE_KEY
ENV VITE_TURNSTILE_SITE_KEY=$VITE_TURNSTILE_SITE_KEY
ENV VITE_POSTHOG_API_KEY=$VITE_POSTHOG_API_KEY
ENV VITE_POSTHOG_HOST=$VITE_POSTHOG_HOST

# Build the app (Vite + prerender)
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy built assets from builder stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
