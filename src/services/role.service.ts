import { Injectable } from '@angular/core';
import { RoleData } from '../model/roleData';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private roleData: RoleData;
  constructor() {

  }
  addRoleData(name: string, role: string){

  }
}
