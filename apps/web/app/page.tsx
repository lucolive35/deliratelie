'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [status, setStatus] = useState<string>('Conectando à API...');
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchApi = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:4000';

      try {      
        const result = await fetch(`${apiUrl}/`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        console.log('Resposta da API:', result);
        const json = await result.json();
        setData(json);
        setStatus('✅ API conectada!');

      } catch (err) {
        console.error('Erro na fetch:', err);
        setStatus(`❌ URL inválida: ${apiUrl}`);
        return;
      }
    };
    
    fetchApi();
  }, []);

  return (
    <main className="min-h-screen p-8 bg-gradient-to-br from-rose-50 via-purple-50 to-indigo-50">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center py-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent">
            DeliraAteliê ✨
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Artesanato com alma e criatividade
          </p>
        </header>

        {/* Status da API */}
        <section className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800">Status do Sistema</h2>
          <p className={`mt-2 font-medium ${status.includes('✅') ? 'text-green-600' : 'text-red-500'}`}>
            {status}
          </p>
          {data && (
            <pre className="mt-4 p-4 bg-gray-50 rounded-lg text-sm overflow-auto">
              {JSON.stringify(data, null, 2)}
            </pre>
          )}
        </section>

        {/* Cards de navegação */}
        <section className="grid gap-6 md:grid-cols-3">
          {[
            { title: 'Portfólio', desc: 'Nossos trabalhos artesanais', icon: '🎨' },
            { title: 'Sobre', desc: 'Conheça nossa história', icon: '✨' },
            { title: 'Contato', desc: 'Vamos criar juntos?', icon: '💬' },
          ].map((item) => (
            <div 
              key={item.title}
              className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <span className="text-3xl">{item.icon}</span>
              <h3 className="mt-4 text-lg font-semibold text-gray-800">{item.title}</h3>
              <p className="text-gray-500 mt-1">{item.desc}</p>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}