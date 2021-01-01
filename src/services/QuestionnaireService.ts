/** Import models */
import { Defaults } from '../models/Defaults';

/** Import services */
import { CrudBaseService } from './CrudBaseService';

/**
 * Service class for manage enums
 */
export class QuestionnaireService extends CrudBaseService {
    /**
     * Initialize the base service
     */
    constructor() {
        super(Defaults.questionnaireServiceEntityName);
    }
}
