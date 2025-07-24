
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const res = await fetch('/api/agent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input }),
    });

    const data = await res.json();
    setResponse(data.result);
    setLoading(false);
  };


  return (
    <main className="max-w-xl mx-auto p-8 space-y-4">
      <h1 className="text-3xl font-bold">Gemini Agent AI</h1>
      <Textarea
        placeholder="Ask me anything..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Thinking...' : 'Submit'}
      </Button>

      {response && (
        <Card>
          <CardContent className="p-4 whitespace-pre-wrap">
            {response}
          </CardContent>
        </Card>
      )}
    </main>
  );
}
