import { useParams } from 'react-router-dom';
import RegioLandingTemplate from './RegioLandingTemplate';
import { regioData } from './regioData';

// Wrapper so the large regioData content + template land in their own lazy
// chunk, loaded only when a rich /regio/* page is visited.
export default function RegioRich() {
  const { slug } = useParams();
  const data = slug ? regioData[slug] : undefined;
  if (!data) return null;
  return <RegioLandingTemplate data={data} />;
}
