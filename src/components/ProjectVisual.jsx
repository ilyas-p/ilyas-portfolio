import { Suspense, lazy } from 'react';
import { ShoppingCart } from 'lucide-react';

const Football3D = lazy(() => import('./Football3D.jsx'));

function CodeVisual() {
  return (
    <div className="visual-code" aria-hidden="true">
      <div>
        <div className="code-line">
          <span className="tok-key">def</span> <span className="tok-fn">hint</span>
          <span className="tok-punc">(code):</span>
        </div>
        <div className="code-line">&nbsp;&nbsp;<span className="tok-com"># analyze &amp; guide</span></div>
        <div className="code-line">
          &nbsp;&nbsp;<span className="tok-key">return</span> <span className="tok-str">"try again"</span>
        </div>
      </div>
      <span className="visual-ai-badge">
        <span className="visual-ai-dot" />
        AI mentor active
      </span>
    </div>
  );
}

function EcommerceVisual() {
  return (
    <div className="visual-ecommerce" aria-hidden="true">
      {Array.from({ length: 6 }).map((_, i) => (
        <div className={`ecom-tile${i === 1 ? ' is-accent' : ''}`} key={i}>
          <span className="ecom-tile-bar" />
        </div>
      ))}
      <span className="ecom-cart-badge">
        <ShoppingCart size={16} />
      </span>
    </div>
  );
}

function ProjectVisual({ type }) {
  if (type === 'code') return <CodeVisual />;
  if (type === 'football') {
    return (
      <Suspense fallback={<div className="visual-code" aria-hidden="true" />}>
        <Football3D />
      </Suspense>
    );
  }
  if (type === 'ecommerce') return <EcommerceVisual />;
  return null;
}

export default ProjectVisual;
