interface Meta {
  firstDate: string;
  lastDate: string;
  youtubeStreamId: string;
}

interface Bean {
  mgmtid: number;
  name: string;
  role: 'onair' | 'offair' | 'external';
  episodeCount: number;
}

interface Slot {
  id: number;
  title: string;
  topic: string;
  game: string;
  showId: number;
  episodeId: number;
  bohnen: Bean[];
  timeStart: string;
  timeEnd: string;
  duration: number;
  durationClass: number;
  streamExclusive: boolean;
  isSubscribed?: boolean;
  type: 'live' | 'premiere' | 'rerun';
}

interface SlotGroup {
  time: number;
  nextTime: number;
  duration: number;
  firstIndex: number;
  lastIndex: number;
  slots: Slot[];
}

interface Day {
  date: number;
  nextDate: number;
  slotGroups: SlotGroup[];
}