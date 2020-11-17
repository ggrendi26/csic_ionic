import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Kategori } from '../models/kategori';

@Injectable({
  providedIn: 'root'
})
export class KategoriService {
  private dbPath = '/kategori';
  kategoriRef: AngularFireList<Kategori> = null;

  constructor(private db: AngularFireDatabase) { 
    this.kategoriRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<Kategori> {
    return this.kategoriRef;
  }

  create(kategori: Kategori): any {
    return this.kategoriRef.push(kategori);
  }

  update(key:string, value: any): Promise<void> {
    return this.kategoriRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.kategoriRef.remove(key);
  }
}
