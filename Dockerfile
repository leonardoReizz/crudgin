FROM node:20.12.1

WORKDIR /app

COPY package* ./

RUN npm install 

COPY . .

ENV HOST=0.0.0.0 
ENV PORT=3000 
ENV NODE_ENV=production
ENV NEXTAUTH_SECRET="randomsecret"
ENV NEXTAUTH_URL=http://localhost:3000
ENV NEXT_PUBLIC_API_URL=http://localhost:3000/api

RUN npm run build

EXPOSE 3000

CMD [ "npm","run", "start" ]