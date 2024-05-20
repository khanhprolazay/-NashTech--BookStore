FROM node:18 as keycloak_jar_builder

COPY ./package.json ./yarn.lock /opt/app/

WORKDIR /opt/app

COPY . /opt/app/

# RUN yarn install --frozen-lockfile
# RUN yarn build-keycloak-theme

FROM quay.io/keycloak/keycloak:24.0.1 as builder

WORKDIR /opt/keycloak

COPY theme/*.jar /opt/keycloak/providers

# for demonstration purposes only, please make sure to use proper certificates in production instead
RUN /opt/keycloak/bin/kc.sh build

FROM quay.io/keycloak/keycloak:latest
COPY --from=builder /opt/keycloak/ /opt/keycloak/

# change these values to point to a running postgres instance
ENV KC_HOSTNAME=localhost
ENV KEYCLOAK_ADMIN=root
ENV KEYCLOAK_ADMIN_PASSWORD=root

ENTRYPOINT ["/opt/keycloak/bin/kc.sh", "start-dev"]

EXPOSE 8080