
import logoImg from './assets/logo.svg';
import * as Dialog from '@radix-ui/react-alert-dialog';
import { GameBanner } from './components/GameBanner';
import { CreateAdBanner } from './components/CreateAdBanner';
import { useEffect, useState } from 'react';
import { CreateAdModal } from './components/Form/CreateAdModal';
import './styles/main.css';
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"


interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}


function App() {
  const [games, setGames] = useState<Game[]>([]);
  const [ref] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 6,
      spacing: 5
    },
  })

  useEffect(() => {
    fetch('http://localhost:3333/games').then(response => response.json()).then(data => { setGames(data) });

  }, []);

  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
      <img src={logoImg} alt="Logo eSports" />
      <h1 className='text-6xl text-white font-black mt-20'>Seu <span className='text-transparent bg-clip-text bg-nlw-gradient'>duo</span> está aqui.</h1>


      <div ref={ref} className='mt-16 overflow-x-auto keen-slider'>
        {games.map(game => {
          return <GameBanner key={game.id} bannerUrl={game.bannerUrl} title={game.title} adsCount={game._count.ads} />
        })}
      </div>


      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>


    </div>
  )
}

export default App

