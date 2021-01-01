/** Import models */
import { DomainEntityWithName } from './DomainEntityWithName';
import { EnergyClassType } from './enums/EnergyClassType';
import { BuildingType } from './enums/BuildingType';
import { WorkflowStatusType } from './enums/WorkflowStatusType';

/**
 * Define a questionnaire domain entity
 */
export class Questionnaire extends DomainEntityWithName {
    /** The first name */
    public firstName!: string;
    /** The lastName */
    public lastName!: string;
    /** The fiscal code */
    public fiscalCode!: string;
    /** The email */
    public email!: string;
    /** The phone */
    public phone!: string;
    /** The as a */
    public asA!: string; // TODO: Enum required
    /** The other as a */
    public otherAsA!: string;
    /** The beneficiary */
    public beneficiary!: string; // TODO: Enum required
    /** The other beneficiary */
    public otherBeneficiary!: string;
    /** The building type */
    public buildingType!: BuildingType;
    /** The intervention type */
    public maintenanceWorkKind!: string; // TODO: Enum required
    /** The intervention type */
    public otherMaintenanceWorkKind!: string;
    /** Indicates if has the Energy Performance Certificate or not */
    public hasEnergyPerformanceCertificate!: boolean;
    /** The building energetic class*/
    public energyClass!: EnergyClassType;
    /** Indicates if already has the Energetic riqualification or not */
    public hasEnergyRedevelopmentProject!: boolean;
    /** Indicates if already has suppliers quotes or not */
    public hasSupplierQuotes!: boolean;
    /** The cost of the operation */
    public estimatedCost!: number;
    /** Indicates if already has start the energetic riqualification */
    public isWorkStarted!: boolean;
    /** Indicates the workflow status */
    public workflowStatus!: WorkflowStatusType;

    /**
     * The constructor
     */
    public constructor() {
        super();
        this.workflowStatus = WorkflowStatusType.PartialCompilation;
    }
}