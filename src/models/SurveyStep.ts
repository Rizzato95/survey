import { SurveyStepType } from './enums/SurveyStepType';

export class SurveyStep {
    /** The title */
    public title!: string;
    /** The step type */
    public type!: SurveyStepType;
    /** The icon class */
    public icon!: string;
    /** Indicates if the step is active */
    public isActive!: boolean;
    /** Indicates if the step is filled */
    public isFilled!: boolean;
}