import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Payment } from '../models/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private dbPath = '/payment';
  paymentRef: AngularFireList<Payment> = null;

  constructor(private db: AngularFireDatabase) { 
    this.paymentRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<Payment> {
    return this.paymentRef;
  }

  create(payment: Payment): any {
    return this.paymentRef.push(payment);
  }

  update(key:string, value: any): Promise<void> {
    return this.paymentRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.paymentRef.remove(key);
  }
}
