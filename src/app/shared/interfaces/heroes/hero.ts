import { EAlignment } from '../../enums/e-alignment.enum';
import { Base } from '../base/base';

export interface Hero extends Base {
    name: string;
    powers: string[];
    alignment: EAlignment;
}
