import { Injectable } from '@angular/core';

import { highlightItem } from '../shared/interface/interface'

@Injectable({
  providedIn: 'root'
})
export class HighlightService {

  private _spaces: highlightItem[] = [
    {
      local: 'Escritorio Central',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image: 'https://picsum.photos/200',
      cost: ( (Math.random() + 1) * 150 ),
      tax: ( Math.random() * 10 ),
      rank: ( Math.random() * 5 ),
      id: Math.floor(Math.random() * 10001), 
    },
    {
      local: 'Escritorio Central',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image: 'https://picsum.photos/200',
      cost: ( (Math.random() + 1) * 150 ),
      tax: ( Math.random() * 10 ),
      rank: ( Math.random() * 5 ),
      id: Math.floor(Math.random() * 10001), 
    },
    {
      local: 'Escritorio Central',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image: 'https://picsum.photos/200',
      cost: ( (Math.random() + 1) * 150 ),
      tax: ( Math.random() * 10 ),
      rank: ( Math.random() * 5 ),
      id: Math.floor(Math.random() * 10001), 
    },
  ]

  private _rooms: highlightItem[] = [
    {
      local: 'Mesa Compartilhada',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image: 'https://picsum.photos/200',
      cost: ( (Math.random() + 1) * 150 ),
      tax: ( Math.random() * 10 ),
      rank: ( Math.random() * 5 ),
      id: Math.floor(Math.random() * 10001), 
    },
    {
      local: 'Mesa Compartilhada',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image: 'https://picsum.photos/200',
      cost: ( (Math.random() + 1) * 150 ),
      tax: ( Math.random() * 10 ),
      rank: ( Math.random() * 5 ),
      id: Math.floor(Math.random() * 10001), 
    },
    {
      local: 'Mesa Compartilhada',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image: 'https://picsum.photos/200',
      cost: ( (Math.random() + 1) * 150 ),
      tax: ( Math.random() * 10 ),
      rank: ( Math.random() * 5 ),
      id: Math.floor(Math.random() * 10001), 
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

  
    /**
     * Getter rooms
     * @return {highlightItem[] }
     */
	public get rooms(): highlightItem[]  {
		return this._rooms;
	}

    /**
     * Setter rooms
     * @param {highlightItem[] } value
     */
	public set rooms(value: highlightItem[] ) {
		this._rooms = value;
	}

  public getSomeSpaces(quantity: number): highlightItem[]{
    let buffer: highlightItem[] = [];
    for (let index = 0; index < quantity; index++) {
      buffer.push({
        local: 'Escritorio Central',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        image: 'https://picsum.photos/200',
        cost: ( (Math.random() + 1) * 150 ),
        tax: ( Math.random() * 10 ),
        rank: ( Math.random() * 5 ),
        id: Math.floor(Math.random() * 10001), 
      });
    }
    return buffer;
  }

  public getSomeRooms(quantity: number): highlightItem[]{
    let buffer: highlightItem[] = [];
    for (let index = 0; index < quantity; index++) {
      buffer.push({
        local: 'Mesa Compartilhada',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        image: 'https://picsum.photos/200',
        cost: ( (Math.random() + 1) * 150 ),
        tax: ( Math.random() * 10 ),
        rank: ( Math.random() * 5 ),
        id: Math.floor(Math.random() * 10001), 
      });
    }
    return buffer;
  }
  
  constructor() { }
  
}
