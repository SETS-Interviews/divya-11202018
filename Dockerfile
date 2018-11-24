FROM node:8
MAINTAINER Divyapuja Vitonde, divyapuja.vitonde@gmail.com

WORKDIR ./
COPY package*.json ./
RUN npm install
COPY . .
#-------------GITHUB_TOKEN not used here----------------------#

ARG GITHUB_TOKEN
ENV GITHUB_TOKEN=$GITHUB_TOKEN

ENV TZ America/New_York
ENV HOUR 7
ENV MINUTE 00
ENV DAY 1
CMD [ "npm", "start" ]