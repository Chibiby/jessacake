export default function TestPage() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1>✅ Deployment Test Page</h1>
      <p>If you can see this page, your Vercel deployment is working correctly!</p>
      <p>The issue is with Supabase connection in your main pages.</p>
      <p>
        <a href="/" style={{ color: '#D4276A' }}>← Back to Homepage</a>
      </p>
    </div>
  );
}
