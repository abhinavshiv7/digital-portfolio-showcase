# --- Stage 1: The Build Stage ---
FROM node:18-alpine as BUILD_IMAGE

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

# --- ENVIRONMENT CONFIGURATION ---
# 1. Declare the arguments (variables) we expect from the command line
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_PUBLISHABLE_KEY  <-- UPDATED NAME

# 2. Set them as environment variables so Vite can bake them into the JS
ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
ENV VITE_SUPABASE_PUBLISHABLE_KEY=$VITE_SUPABASE_PUBLISHABLE_KEY
# ---------------------------------

RUN npm run build

# --- Stage 2: The Production Stage ---
FROM nginx:alpine
COPY --from=BUILD_IMAGE /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]