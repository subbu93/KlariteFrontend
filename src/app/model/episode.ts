import {SkillEpisode} from './skill-episode';

export class Episode {
  id: number;
  userId: number;
  date: Date;
  mrn: string;
  status: string;
  episodes: SkillEpisode[];
  comment: string;
}
