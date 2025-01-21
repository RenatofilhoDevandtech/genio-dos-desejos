import { useState } from 'react';
import GenioDaLampada from './assets/Img/GenioDaLampada.svg';
import LampadaMagica from './assets/Img/LampadaMagica.svg';
import Header from '../src/Componets/Header';
import Hero from '../src/Componets/Hero';
import Genie from '../src/Componets/Genie';
import Footer from '../src/Componets/Footer';
import '../src/assets/Styles/app.scss';

export default function App() {
  const [imagem, setImagem] = useState(LampadaMagica);
  const [mensagem, setMensagem] = useState("Digite seu desejo e clique na lâmpada mágica!");
  const [animacao, setAnimacao] = useState(false);
  const [bgClass, setBgClass] = useState('');

  const mudarImagem = () => {
    setImagem(imagem === LampadaMagica ? GenioDaLampada : LampadaMagica);
    setMensagem(imagem === LampadaMagica ? "O Gênio apareceu! Faça seu desejo." : "Digite seu desejo e clique na lâmpada mágica!");
    setAnimacao(true);
    setBgClass(imagem === LampadaMagica ? 'magic-bg' : '');
    setTimeout(() => setAnimacao(false), 500);
  };

  return (
    <main className={`app-main ${animacao ? "shake" : ""} ${bgClass}`}>
      <Header />
      <Hero />
      <Genie imagem={imagem} mudarImagem={mudarImagem} mensagem={mensagem} />
      <Footer />
    </main>
  );
}
