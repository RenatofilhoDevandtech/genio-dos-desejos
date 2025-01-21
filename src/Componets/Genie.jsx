import PropTypes from 'prop-types';
import { useState } from 'react';

function Genie({ imagem, mudarImagem }) {
  const [desejo, setDesejo] = useState('');
  const [resposta, setResposta] = useState('');
  const [loading, setLoading] = useState(false);

  const enviarDesejo = async () => {
    if (!desejo) {
      setResposta("Por favor, digite um desejo.");
      return;
    }

    setLoading(true);
    try {
      const apiKey = import.meta.env.VITE_COHERE_API_KEY;
      if (!apiKey) {
        throw new Error('API key is missing');
      }

      const response = await fetch('https://api.cohere.com/v2/chat', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'command-r-plus-08-2024',
          messages: [
            {
              role: 'user',
              content: `Um usuário pediu: ${desejo}. Responda com uma frase engraçada.`,
            },
          ],
          max_tokens: 50,
          stop_sequences: ['\n'],
          temperature: 0.9,
        }),
      });

      if (!response.ok) {
        throw new Error('Erro na resposta da API');
      }

      const data = await response.json();
      setResposta(data.message.content[0].text.trim());
      setDesejo('');  // Limpar o campo de entrada após o envio
    } catch (error) {
      console.error("Erro ao enviar desejo:", error);
      setResposta("Oops! Algo deu errado. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const resetApp = () => {
    setDesejo('');
    setResposta('');
  };

  return (
    <div className="genie">
      <input 
        type="text" 
        placeholder="Digite seu desejo..." 
        value={desejo} 
        onChange={(e) => setDesejo(e.target.value)} 
        className="genie-input"
      />
      <button onClick={enviarDesejo} className="genie-button" disabled={loading}>
        {loading ? "Enviando..." : "Pedir Desejo"}
      </button>
      {resposta && (
        <>
          <p className="genie-response">{resposta}</p>
          <button onClick={resetApp} className="genie-reset-button">
            Fazer Novo Desejo
          </button>
        </>
      )}
      <img 
        src={imagem} 
        alt="Imagem da lâmpada mágica e gênio da lâmpada" 
        className="magic-image" 
        onClick={mudarImagem} 
      />
    </div>
  );
}

Genie.propTypes = {
  imagem: PropTypes.string.isRequired,
  mudarImagem: PropTypes.func.isRequired,
};

export default Genie;
