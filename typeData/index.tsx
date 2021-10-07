import { LatLng } from "react-native-maps";

// export interface dataNews {
//   name: string;
//   img: string;
//   information: string;
//   date: string;
// }
export interface errorValueLogin {
  username: string;
  password: string;
}
export interface fromDatKham {
  fullName: string;
  email: string;
  numberPhone: string;
  sex: string;
  address: string;
  reason: string;
  date: Date;
  time: string;
}
export interface marker {
  latlng: LatLng;
  title: string;
  description: string;
}
export interface dataNewsApi {
  id: string;
  news_name: string;
  news_images: string;
  news_alias: string;
  news_small_description: string;
  created_at: string;
  fullname: string;
  cat_alias: null | number;
}
