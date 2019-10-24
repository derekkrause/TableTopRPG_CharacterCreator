import React from 'react';
import { CardImg } from 'reactstrap';

export default function RaceImg(props) {
   switch (props.name) {
      case 'Android':
         return CardImage('https://paizo.com/image/content/Starfinder/PZO7101-Iseph.jpg');
      case 'Human':
         return CardImage('https://i.pinimg.com/474x/c5/42/3b/c5423b0bc6e4ce8c4133cbe8f8f9ac48.jpg');
      case 'Kasatha':
         return CardImage(
            'https://starfinderwiki.com/mediawikisf/images/thumb/4/40/Data_jockey.jpg/288px-Data_jockey.jpg'
         );
      case 'Lashunta':
         return CardImage('https://i.pinimg.com/474x/08/9b/6b/089b6b4180e219dfd001ef94bf73e86e.jpg');
      case 'Shirren':
         return CardImage('https://i.pinimg.com/474x/4b/66/6a/4b666a0288c6d25d4ec52cb1f4af7436.jpg');
      case 'Vesk':
         return CardImage('https://i.pinimg.com/474x/33/28/e0/3328e054da6de48e5f885cfdda0d61f5.jpg');
      case 'Ysoki':
         return CardImage('https://i.pinimg.com/474x/05/14/cf/0514cf0188e5357e972fab8b5301e500.jpg');
      default:
         return <div className='d-none'></div>;
   }
}

function CardImage(src) {
   return <CardImg src={src} />;
}
