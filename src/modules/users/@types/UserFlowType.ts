import { BaseType } from "@hiobairo/app-core";
import { WorkflowType } from "../../flows/@types/WorkflowType";

export type UserFlowType = {
  id: number,
  userFk: string,
  flowFk: number,
  flow?: WorkflowType,
  actionUserFlows: {
    userFlowFk: number;
    actionFlowFk: number;
    id: number;
    active: boolean;
    isDeleted: boolean;
  }[]
} & BaseType

