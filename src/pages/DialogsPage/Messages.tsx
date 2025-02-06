import React, { useEffect, useState } from 'react';
import { instance } from '../../api/api.ts';

interface Message {
  userId: number;
  body: string;
}

interface MessagesProps {
  userId: number;
}

const Messages: React.FC<MessagesProps> = ({ userId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1); // Pagină curentă
  const count = 10; // Numărul de mesaje pe pagină

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await instance.get(`dialogs/${userId}/messages`, {
          params: {
            page: page,
            count: count,
          },
        });

        // Verificăm dacă response.data este un array
        const messagesData = Array.isArray(response.data)
          ? response.data
          : response.data.items || [];

        setMessages(messagesData); // Setăm lista de mesaje
      } catch (error) {
        setError('Nu s-au putut încărca mesajele. Încearcă din nou.');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [userId, page]);

  if (loading) return <p>Se încarcă mesajele...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Mesaje cu prietenul</h2>
      <ul>
        {messages.length > 0 ? (
          messages.map((message) => (
            <li key={message.userId}>{message.body}</li>
          ))
        ) : (
          <p>Nu există mesaje.</p>
        )}
      </ul>
      <div>
        <button
          onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
          disabled={page === 1}
        >
          Pagina anterioară
        </button>
        <button
          onClick={() => setPage((prevPage) => prevPage + 1)}
          disabled={messages.length < count}
        >
          Pagina următoare
        </button>
      </div>
    </div>
  );
};

export default Messages;
