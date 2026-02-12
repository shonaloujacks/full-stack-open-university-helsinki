export interface NotificationProp {
  errorNotification: string;
}

export interface DiaryEntry {
  id: string,
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment: string;

  }

export interface DiaryListProp {
  diaries: DiaryEntry[];  
  }

export interface NewDiaryFormProp {
    diaries: DiaryEntry[];
    setDiaries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
    showError: (message: string ) => void;
  };


export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'stormy' | 'windy';

export type Visibility = 'great' | 'good' | 'ok' | 'poor';

export type NewDiaryEntry = Omit<DiaryEntry, 'id'>
