export interface Diary {
  id: string,
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment: string;

}

export interface DiaryListProp {
  diaries: Diary[];
}

type Weather = 'sunny' | 'rainy' | 'cloudy' | 'stormy' | 'windy';

type Visibility = 'great' | 'good' | 'ok' | 'poor';

export type NewDiary = Omit<Diary, 'id'>
