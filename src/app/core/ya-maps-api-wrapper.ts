import {Injectable, NgZone} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';

import * as mapTypes from './ya-maps-types';
import {YaMapsAPILoader} from './services/ya-maps-loader';
import {YaMarker} from './directives/marker';

declare var ymaps: any;

@Injectable()
export class YaMapsAPIWrapper {

    
     _map: Promise<mapTypes.YandexMap>;
     private _mapResolver: (value?: mapTypes.YandexMap) => void;

    constructor(private _loader: YaMapsAPILoader, private _zone: NgZone) {
    this._map =
        new Promise<mapTypes.YandexMap>((resolve: () => void) => { this._mapResolver = resolve; });
  }

  createMap(el: HTMLElement, mapOptions: mapTypes.MapOptions): Promise<void> {
    setTimeout(() => 
    {
      const map = new ymaps.Map(el, mapOptions);
        this._mapResolver(<mapTypes.YandexMap>map);
       console.log('Mauu');
       //  this.createMarker();
    }, 10000);
    return this._loader.load().then(() => {
        console.log('Ma');
        const map = new ymaps.Map(el, mapOptions);
        this._mapResolver(<mapTypes.YandexMap>map)
       
        
        return;
    }).catch( e => console.log(e));
  }

  createMarker(marker: YaMarker):
      Promise<mapTypes.Marker> {
    return this._map.then((map: mapTypes.YandexMap) => {
      var m = new ymaps.Placemark([marker.latitude, marker.longitude], {});//([55.847, 37.6], {});
        map.geoObjects.add(m);
      return m;
    });
  }
  
}