version: "3.8"
services:
  #  backend:
  #    build: ./app/Backend
  #    ports: 
  #      - 3001:3001
  #    env_file: .env
  #    depends_on: 
  #      - db
   db:
    image: postgres:10.16
    environment:
      POSTGRES_USER: root
      POSTGRES_PASSWORD: root
      POSTGRES_DB: NG_Cash
    ports: 
      - 5432:5432
    volumes: 
      - db-data:/var/lib/postgresql/data
volumes: 
  db-data: