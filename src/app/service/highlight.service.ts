import { Injectable } from '@angular/core';

import { highlightItem } from '../interface/interface'

@Injectable({
  providedIn: 'root'
})
export class HighlightService {

  private _spaces: highlightItem[] = [
    {
      local: 'Goiânia - GO',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image: 'https://picsum.photos/200',
      cost: ( (Math.random() + 1) * 150 ),
      tax: ( Math.random() * 10 ),
      rank: ( Math.random() * 5 )
    },
    {
      local: 'Goiânia - GO',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image: 'https://picsum.photos/200',
      cost: ( (Math.random() + 1) * 150 ),
      tax: ( Math.random() * 10 ),
      rank: ( Math.random() * 5 )
    },
    {
      local: 'Goiânia - GO',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image: 'https://picsum.photos/200',
      cost: ( (Math.random() + 1) * 150 ),
      tax: ( Math.random() * 10 ),
      rank: ( Math.random() * 5 )
    },
    {
      local: 'Goiânia - GO',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image: 'https://picsum.photos/200',
      cost: ( (Math.random() + 1) * 150 ),
      tax: ( Math.random() * 10 ),
      rank: ( Math.random() * 5 )
    },
    {
      local: 'Goiânia - GO',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image: 'https://picsum.photos/150',
      cost: ( (Math.random() + 1) * 150 ),
      tax: ( Math.random() * 10 ),
      rank: ( Math.random() * 5 )
    },
    {
      local: 'Goiânia - GO',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image: 'https://picsum.photos/150',
      cost: ( (Math.random() + 1) * 150 ),
      tax: ( Math.random() * 10 ),
      rank: ( Math.random() * 5 )
    },
    {
      local: 'Goiânia - GO',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image: 'https://picsum.photos/150',
      cost: ( (Math.random() + 1) * 150 ),
      tax: ( Math.random() * 10 ),
      rank: ( Math.random() * 5 )
    },
    {
      local: 'Goiânia - GO',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image: 'https://picsum.photos/150',
      cost: ( (Math.random() + 1) * 150 ),
      tax: ( Math.random() * 10 ),
      rank: ( Math.random() * 5 )
    },
  ]


    /**
     * Getter spaces
     * @return {highlightItem[] }
     */
	public get spaces(): highlightItem[]  {
		return this._spaces;
	}

    /**
     * Setter spaces
     * @param {highlightItem[] } value
     */
	public set spaces(value: highlightItem[] ) {
		this._spaces = value;
  }

  public getSome(quantity: number): highlightItem[]{
    let buffer: highlightItem[] = [];
    for (let index = 0; index < quantity; index++) {
      buffer.push(this._spaces[index]);
    }
    return buffer;
  }
  
  constructor() { }
  
}
