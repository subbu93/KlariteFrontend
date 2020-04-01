export class SkillAssignment {
  assignmentId: number;
  skillId: number;
  assignedUserIds: bigint[];
  skillAssignmentName: string;
  costCenterId: number;
  skillValidatorId: number;
  completionDate: Date;
  isSelected: boolean;
}
