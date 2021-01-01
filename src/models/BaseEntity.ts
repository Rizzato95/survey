
/** Import models */
import { EntityStatusType } from './enums/EntityStatusType';

/**
 * The class for base entity
 */
export class BaseEntity {
    /** The entity id */
    id!: number;
    /** The entity row version */
    rowVersion!: number;
    /** The entity explicit path */
    explicitPath?: string;
    /** The entity status type */
    status!: EntityStatusType;
}
