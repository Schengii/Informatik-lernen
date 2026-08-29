/**
 * Kubernetes Helm Chart & Kustomize Overlay Generator Engine
 * Generates production-ready Helm chart packages and Kustomize overlay structures.
 */

export function generateHelmChart({
  appName = 'my-web-service',
  version = '1.0.0',
  appVersion = '2.4.0',
  imageRepo = 'ghcr.io/org/web-service',
  replicas = 3,
  servicePort = 8080
}) {
  const chartYaml = `apiVersion: v2
name: ${appName}
description: Helm Chart für ${appName} Microservice
type: application
version: ${version}
appVersion: "${appVersion}"`;

  const valuesYaml = `replicaCount: ${replicas}

image:
  repository: ${imageRepo}
  pullPolicy: IfNotPresent
  tag: "${appVersion}"

service:
  type: ClusterIP
  port: ${servicePort}
  targetPort: ${servicePort}

ingress:
  enabled: true
  className: "nginx"
  hosts:
    - host: ${appName}.example.com
      paths:
        - path: /
          pathType: Prefix

resources:
  limits:
    cpu: 500m
    memory: 512Mi
  requests:
    cpu: 100m
    memory: 128Mi

autoscaling:
  enabled: true
  minReplicas: 2
  maxReplicas: 10
  targetCPUUtilizationPercentage: 80`;

  const deploymentYaml = `apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ include "${appName}.fullname" . }}
  labels:
    {{- include "${appName}.labels" . | nindent 4 }}
spec:
  replicas: {{ .Values.replicaCount }}
  selector:
    matchLabels:
      {{- include "${appName}.selectorLabels" . | nindent 6 }}
  template:
    metadata:
      labels:
        {{- include "${appName}.selectorLabels" . | nindent 8 }}
    spec:
      containers:
        - name: {{ .Chart.Name }}
          image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"
          imagePullPolicy: {{ .Values.image.pullPolicy }}
          ports:
            - containerPort: {{ .Values.service.targetPort }}
          resources:
            {{- toYaml .Values.resources | nindent 12 }}`;

  return {
    chartYaml,
    valuesYaml,
    deploymentYaml
  };
}

export function generateKustomizeOverlays({
  appName = 'my-web-service',
  prodReplicas = 5,
  prodImageTag = 'v2.4.0'
}) {
  const baseKustomization = `apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

resources:
  - deployment.yaml
  - service.yaml

commonLabels:
  app.kubernetes.io/name: ${appName}`;

  const prodKustomization = `apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

namespace: production

resources:
  - ../../base

namePrefix: prod-

images:
  - name: ghcr.io/org/web-service
    newTag: "${prodImageTag}"

replicas:
  - name: ${appName}
    count: ${prodReplicas}`;

  return {
    baseKustomization,
    prodKustomization
  };
}
