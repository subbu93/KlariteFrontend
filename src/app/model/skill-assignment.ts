export class SkillAssignment {
  assignmentId: number;
  skillId: number;
  userIds: bigint[];
  skillAssignmentName: string;
  costCenterId: number;
  skillValidatorId: number;
  completionDate: Date;
  isSelected: boolean;
}
