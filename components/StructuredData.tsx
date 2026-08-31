export interface StructuredDataProps {
  data: object;
}

export const StructuredData = ({ data }: StructuredDataProps) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
  />
);
