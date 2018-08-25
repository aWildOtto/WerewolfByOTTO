import { Villager } from './villager';
import { Werewolf } from './werewolf';
export interface RoleData {
    werewolves?: Werewolf[];
    villagers?: Villager[];
    witch?: {
        name: string,
        uid?: string,
        poison: string, // empty if unused, or player name -> used on 
        potion: string, // empty if unused, or player name -> used on 
        killedBy: string// empty if alive, or death cause
    };
    seer?: {
        name: string,
        uid?: string,
        killedBy: string
    };
    hunter?: {
        name: string,
        uid?: string,
        killedBy: string,
        retaliated: string // empty if unused, or player name if retaliated someone
    };
    guardian?: {
        name: string,
        uid?: string,
        killedBy: string,
        protecting: string
    };
    mod?: {
        uid?: string,
        name: string
    };
}
