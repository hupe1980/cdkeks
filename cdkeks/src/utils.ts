import * as cdk8s from 'cdk8s';

export function generateMetadata(
  metadata?: cdk8s.ApiObjectMetadata,
  additionalAnnotations?: Record<string, string>,
): cdk8s.ApiObjectMetadata | undefined {
  const metadataDefinition = new cdk8s.ApiObjectMetadataDefinition(metadata);

  if (additionalAnnotations) {
    for (const [key, value] of Object.entries(additionalAnnotations)) {
      metadataDefinition.addAnnotation(key, value);
    }
  }

  return metadataDefinition.toJson();
}
